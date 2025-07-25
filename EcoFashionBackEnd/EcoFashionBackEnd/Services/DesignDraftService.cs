using AutoMapper;
using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests.DessignDraft;
using EcoFashionBackEnd.Dtos.DesignDraft;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace EcoFashionBackEnd.Services
{
    public class DesignDraftService
    {
        private readonly IRepository<Design, int> _designRepository;
        private readonly IRepository<DraftPart, int> _draftPartRepository;
        private readonly IRepository<DraftSketch, int> _draftSketchRepository;
        private readonly IRepository<Image, int> _imageRepository;
        private readonly CloudService _cloudService;
        private readonly IMapper _mapper;

        public DesignDraftService(
            IRepository<Design, int> designRepository,
            IRepository<DraftPart, int> draftPartRepository,
            IRepository<DraftSketch, int> draftSketchRepository,
            IRepository<Image, int> imageRepository,
            CloudService cloudService,
            IMapper mapper)
        {
            _designRepository = designRepository;
            _draftPartRepository = draftPartRepository;
            _draftSketchRepository = draftSketchRepository;
            _imageRepository = imageRepository;
            _cloudService = cloudService;
            _mapper = mapper;
        }

        public async Task<int> CreateDraftDesignAsync(DraftDesignCreateRequest request, Guid designerId)
        {
            // 1. Tạo Design
            var design = new Design
            {
                DesignerId = designerId,
                Name = request.Name,
                Description = request.Description,
                RecycledPercentage = request.RecycledPercentage,
                Stage = DesignStage.Draft,
                DesignTypeId = request.DesignTypeId,
                CreatedAt = DateTime.UtcNow,
            };

            await _designRepository.AddAsync(design);
            await _designRepository.Commit();

            try
            {
                var draftParts = JsonConvert.DeserializeObject<List<DraftPartDto>>(request.DraftPartsJson ?? "[]");
            if (draftParts != null && draftParts.Any())
            {
                var draftPartEntities = draftParts.Select(part => new DraftPart
                {
                    DesignId = design.DesignId,
                    Name = part.Name,
                    Length = part.Length,
                    Width = part.Width,
                    Quantity = part.Quantity,
                    MaterialId = part.MaterialId,
                    MaterialStatus = part.MaterialStatus
                }).ToList();

                await _draftPartRepository.AddRangeAsync(draftPartEntities);
            }
            }
            catch (JsonException ex)
            {
                throw new Exception("Lỗi khi parse DraftPartsJson. Kiểm tra định dạng JSON: phải là một mảng [].", ex);
            } 

            if (request.SketchImages != null && request.SketchImages.Any())
            {
                var uploadResults = await _cloudService.UploadImagesAsync(request.SketchImages);
                foreach (var uploadResult in uploadResults)
                {
                    if (!string.IsNullOrWhiteSpace(uploadResult?.SecureUrl?.ToString()))
                    {
                        var designDraftImage = new DraftSketch
                        {
                            DesignId = design.DesignId,
                            Image = new Image
                            {
                                ImageUrl = uploadResult.SecureUrl.ToString()
                            }
                        };
                        await _draftSketchRepository.AddAsync(designDraftImage);
                    }
                }
            }

            await _draftPartRepository.Commit();
            await _draftSketchRepository.Commit();

            return design.DesignId;
        }










    }
}
