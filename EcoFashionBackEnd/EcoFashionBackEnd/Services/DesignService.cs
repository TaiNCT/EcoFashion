using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using EcoFashionBackEnd.Services;

public class DesignService
{
    private readonly IRepository<Design, int> _designRepository;
    private readonly IRepository<DesignFeature, int> _designsFeatureRepository;
    private readonly IRepository<Image, int> _imageRepository;
    private readonly IRepository<DesignImage, int> _designImageRepository;
    private readonly IMapper _mapper;
    private readonly CloudService _cloudService;
    private readonly AppDbContext _dbContext;

    public DesignService(IRepository<Design, int> designRepository, IRepository<DesignFeature, int> designsFeatureRepository, IRepository<Image, int> imageRepository, IRepository<DesignImage, int> designImageRepository, IMapper mapper, CloudService cloudService, AppDbContext dbContext)
    {
        _designRepository = designRepository;
        _designsFeatureRepository = designsFeatureRepository;
        _imageRepository = imageRepository;
        _designImageRepository = designImageRepository;
        _mapper = mapper;
        _cloudService = cloudService;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<DesignModel>> GetAllDesigns()
    {
        var designs = await _designRepository.GetAll().ToListAsync();
        return _mapper.Map<List<DesignModel>>(designs);
    }

    public async Task<DesignModel?> GetDesignById(int id)
    {
        var design = await _designRepository.GetByIdAsync(id);
        return _mapper.Map<DesignModel>(design);
    }

   

    public async Task<int> CreateDesign(CreateDesignRequest request, Guid designerId, List<IFormFile>? imageFiles)
    {
        if (!request.DesignTypeId.HasValue)
        {
            throw new Exception("DesignTypeId không hợp lệ.");
        }

        var designTypeExists = await _dbContext.DesignsTypes.AnyAsync(dt => dt.DesignTypeId == request.DesignTypeId.Value);
        if (!designTypeExists)
        {
            throw new Exception($"DesignTypeId '{request.DesignTypeId.Value}' không tồn tại.");
        }

        var designEntity = _mapper.Map<Design>(request);
        designEntity.DesignerId = designerId;
        designEntity.CreatedAt = DateTime.UtcNow;

   
        await _designRepository.AddAsync(designEntity);
        Console.WriteLine($"Giá trị DesignTypeId trước khi lưu: {designEntity.DesignTypeId}");
        await _designRepository.Commit();
        if (imageFiles != null && imageFiles.Any())
        {
            var uploadResults = await _cloudService.UploadImagesAsync(imageFiles);
            foreach (var uploadResult in uploadResults)
            {
                if (uploadResult?.SecureUrl != null)
                {
                    var imageEntity = new Image { ImageUrl = uploadResult.SecureUrl.ToString() };
                    await _imageRepository.AddAsync(imageEntity);
                    await _imageRepository.Commit();

                    var designImageEntity = new DesignImage
                    {
                        DesignId = designEntity.DesignId,
                        ImageId = imageEntity.ImageId
                    };
                    await _designImageRepository.AddAsync(designImageEntity);
                    await _designImageRepository.Commit();
                }
            }
        }

        return designEntity.DesignId;
    }
    public async Task<bool> UpdateDesign(int id, UpdateDesignRequest request)
    {
        var existingDesign = await _designRepository.GetByIdAsync(id);
        if (existingDesign == null) return false;

        _mapper.Map(request, existingDesign); // Áp dụng các thay đổi từ request
        _designRepository.Update(existingDesign);
        var result = await _designRepository.Commit();
        return result > 0;
    }

    public async Task<bool> DeleteDesign(int id)
    {
        var result = _designRepository.Remove(id);
        await _designRepository.Commit();
        return result != null;
    }
}