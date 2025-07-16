using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Design;
using CloudinaryDotNet.Actions;

namespace EcoFashionBackEnd.Services
{
    public class DesignService
    {
        private readonly IRepository<Design, int> _designRepository;
        private readonly IRepository<DesignFeature, int> _designsFeatureRepository;
        private readonly IRepository<DesignsVarient, int> _designsVarientRepository;
        private readonly IRepository<Image, int> _imageRepository;
        private readonly IRepository<DesignImage, int> _designImageRepository;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly CloudService _cloudService;

        public DesignService(
            IRepository<Design, int> designRepository,
            IRepository<DesignFeature, int> designsFeatureRepository,
            IRepository<DesignsVarient, int> designsVarientRepository,
            IRepository<Image, int> imageRepository,
            IRepository<DesignImage, int> designImageRepository,
            AppDbContext dbContext,
            IMapper mapper,
            CloudService cloudService)
        {
            _designRepository = designRepository;
            _designsFeatureRepository = designsFeatureRepository;
            _designsVarientRepository = designsVarientRepository;
            _imageRepository = imageRepository;
            _designImageRepository = designImageRepository;
            _dbContext = dbContext;
            _mapper = mapper;
            _cloudService = cloudService;
        }
        public async Task<DesignDetailDto?> GetDesignDetailById(int id)
        {
            var design = await _dbContext.Designs
                .Include(d => d.DesignTypes)
                .Include(d => d.DesignImages).ThenInclude(di => di.Image)
                .Include(d => d.DesignsFeature)
                .Include(d => d.DesignsVarients).ThenInclude(v => v.DesignsColor)
                .Include(d => d.DesignsVarients).ThenInclude(v => v.DesignsSize)
                .Include(d => d.DesignsMaterials)
                .Include(d => d.DesignsRatings)
                .Include(d => d.DesignerProfile)
                .FirstOrDefaultAsync(d => d.DesignId == id);

            if (design == null) return null;

            return new DesignDetailDto
            {
                DesignId = design.DesignId,
                Name = design.Name,
                Description = design.Description,
                RecycledPercentage = design.RecycledPercentage,
                CareInstructions = design.CareInstructions,
                Price = design.Price,
                Quantity = design.Quantity,
                ProductScore = design.ProductScore,
                Status = design.Status,
                CreatedAt = design.CreatedAt,

                DesignTypeName = design.DesignTypes?.DesignName,
                ImageUrls = design.DesignImages.Select(di => di.Image.ImageUrl).ToList(),

                Feature = design.DesignsFeature == null ? null : new DesignFeatureDto
                {
                    ReduceWaste = design.DesignsFeature.ReduceWaste,
                    RecycledMaterials = design.DesignsFeature.RecycledMaterials,
                    LowImpactDyes = design.DesignsFeature.LowImpactDyes,
                    Durable = design.DesignsFeature.Durable,
                    EthicallyManufactured = design.DesignsFeature.EthicallyManufactured
                },

                Varients = design.DesignsVarients.Select(v => new VarientDto
                {
                    SizeName = v.DesignsSize?.SizeName ?? "",
                    ColorName = v.DesignsColor?.ColorName ?? "",
                    ColorCode = v.DesignsColor?.ColorCode ?? "",
                    Quantity = v.Quantity,
                    CarbonFootprint = v.CarbonFootprint,
                    WaterUsage = v.WaterUsage,
                    WasteDiverted = v.WasteDiverted
                }).ToList(),

                Materials = design.DesignsMaterials.Select(m => new MaterialDto
                {
                    SavedMaterialId = m.SavedMaterialId,
                    PersentageUsed = m.PersentageUsed,
                    MeterUsed = m.MeterUsed
                }).ToList(),

                AvgRating = design.DesignsRatings.Any() ? design.DesignsRatings.Average(r => r.RatingScore) : null,
                ReviewCount = design.DesignsRatings.Count(),

                Designer = new DesignerPublicDto
                {
                    DesignerId = design.DesignerProfile.DesignerId,
                    DesignerName = design.DesignerProfile.DesignerName,
                    AvatarUrl = design.DesignerProfile.AvatarUrl,
                    Bio = design.DesignerProfile.Bio,
                    SpecializationUrl = design.DesignerProfile.SpecializationUrl,
                    PortfolioUrl = design.DesignerProfile.PortfolioUrl,
                    BannerUrl = design.DesignerProfile.BannerUrl,
                    Rating = design.DesignerProfile.Rating,
                    ReviewCount = design.DesignerProfile.ReviewCount,
                    Certificates = design.DesignerProfile.Certificates
                }
            };
        }






        public async Task<int> CreateDesign(CreateDesignRequest request, Guid designerId, List<IFormFile> imageFiles)
        {
            if (!request.DesignTypeId.HasValue ||
                !await _dbContext.DesignsTypes.AnyAsync(dt => dt.DesignTypeId == request.DesignTypeId.Value))
            {
                throw new Exception("DesignTypeId không hợp lệ hoặc không tồn tại.");
            }

          
            var design = _mapper.Map<Design>(request);
            design.DesignerId = designerId;
            design.CreatedAt = DateTime.UtcNow;

            await _designRepository.AddAsync(design);
            await _designRepository.Commit(); 

            var feature = _mapper.Map<DesignFeature>(request);
            feature.DesignId = design.DesignId;

            await _designsFeatureRepository.AddAsync(feature);
            List<ImageUploadResult> uploadResults = await _cloudService.UploadImagesAsync(imageFiles);
            if (imageFiles?.Any() == true)
            {

                if (uploadResults.Any())
                {
                    foreach (var uploadResult in uploadResults)
                    {
                        if (!string.IsNullOrWhiteSpace(uploadResult?.SecureUrl?.ToString()))
                        {
                            var designImage = new DesignImage
                            {
                                DesignId = design.DesignId,
                                Image = new Image
                                {
                                    ImageUrl = uploadResult.SecureUrl.ToString()
                                }
                            };

                            await _designImageRepository.AddAsync(designImage);
                        }
                        else
                        {
                            Console.WriteLine("⚠️ Upload failed or returned null SecureUrl.");
                        }
                    }
                }
            }


            await _designRepository.Commit();

            return design.DesignId;
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
}