using AutoMapper;
using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests;
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
        #region injection
        private readonly IRepository<Design, int> _designRepository;
        private readonly IRepository<Designer, int> _designerRepository;
        private readonly IRepository<DesignsMaterial, int> _designMaterialRepository;
        private readonly IRepository<Material, int> _MaterialRepository;
        private readonly IRepository<DesignsVariant, int> _designVariantRepository;
        private readonly IRepository<DesignerMaterialInventory, int> _designerMaterialInventoryRepository;
        private readonly IRepository<DraftPart, int> _draftPartRepository;
        private readonly IRepository<DraftSketch, int> _draftSketchRepository;
        private readonly IRepository<Image, int> _imageRepository;
        private readonly CloudService _cloudService;
        private readonly IMapper _mapper;

        public DesignDraftService(
            IRepository<Design, int> designRepository,
            IRepository<Designer, int> designerRepository,
            IRepository<DesignsMaterial, int> designMaterialRepository,
            IRepository<Material, int> MaterialRepository,
            IRepository<DesignsVariant, int> designVariantRepository,
            IRepository<DraftPart, int> draftPartRepository,
            IRepository<DraftSketch, int> draftSketchRepository,
            IRepository<Image, int> imageRepository,
            CloudService cloudService,
            IMapper mapper)
        {
            _designRepository = designRepository;
            _designerRepository = designerRepository;
            _designMaterialRepository = designMaterialRepository;
            _MaterialRepository = MaterialRepository;
            _designVariantRepository = designVariantRepository;
            _draftPartRepository = draftPartRepository;
            _draftSketchRepository = draftSketchRepository;
            _imageRepository = imageRepository;
            _cloudService = cloudService;
            _mapper = mapper;
        }
        #endregion
        public async Task<int> CreateDraftDesignAsync(DraftDesignCreateRequest request, Guid designerId)
        {
            // 1. Tạo Design
            var design = new Design
            {
                DesignerId = designerId,
                Name = request.Name,
                Description = request.Description,
                RecycledPercentage = request.RecycledPercentage,
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
                    Length = (decimal)part.Length,
                    Width = (decimal)part.Width,
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
        public async Task<List<DesignDraftDto>> GetAllDraftsAsync(Guid designerId)
        {
            var drafts = await _designRepository
                .GetAll().Include(d => d.DraftSketches)
                  .ThenInclude(ds => ds.Image)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return drafts.Select(d => new DesignDraftDto
            {
                DesignId = d.DesignId,
                Name = d.Name,
                CreatedAt = d.CreatedAt,
                SketchImageUrls = d.DraftSketches.Select(ds => ds.Image.ImageUrl).ToList()
            }).ToList();
        }

        public async Task<DraftDesignDetailDto?> GetDraftDetailAsync(int designId, Guid designerId)
        {
            var design = await _designRepository
                .GetAll()
                .Include(d => d.DraftParts)
                .Include(d => d.DraftSketches)
                .ThenInclude(s => s.Image)
                .FirstOrDefaultAsync(d => d.DesignId == designId && d.DesignerId == designerId );

            if (design == null) return null;

            return new DraftDesignDetailDto
            {
                DesignId = design.DesignId,
                Name = design.Name,
                Description = design.Description,
                RecycledPercentage = design.RecycledPercentage,
                //DesignTypeId = design.DesignTypeId ?? 0,
                DraftParts = design.DraftParts.Select(p => new DraftPartDto
                {
                    Name = p.Name,
                    Length = (float)p.Length,
                    Width = (float)p.Width,
                    Quantity = p.Quantity,
                    MaterialId = p.MaterialId,
                    MaterialStatus = p.MaterialStatus
                }).ToList(),
                SketchImageUrls = design.DraftSketches.Select(s => s.Image.ImageUrl).ToList()
            };
        }

        public async Task<bool> FinalizeDesignAsync(FinalizeDesignRequest request)
        {
            var design = await _designRepository
                .GetAll()
                .Include(d => d.DesignsMaterials)
                //.Include(d => d.DesignTypes)
                .FirstOrDefaultAsync(d => d.DesignId == request.DesignId);

            if (design == null)
                throw new Exception("Design không tồn tại.");

          

            // Thêm mới vật liệu
            var newMaterials = request.Materials.Select(m => new DesignsMaterial
            {
                DesignId = request.DesignId,
                MaterialId = m.MaterialId,
                MeterUsed = (int)m.MeterUsed
            }).ToList();

            await _designMaterialRepository.AddRangeAsync(newMaterials);

            //// Thêm mới feature
            //var newFeature = new DesignFeature
            //{
            //    DesignId = request.DesignId,
            //    ReduceWaste = request.ReduceWaste,
            //    LowImpactDyes = request.LowImpactDyes,
            //    Durable = request.Durable,
            //    EthicallyManufactured = request.EthicallyManufactured
            //};
            //await _designFeatureRepository.AddAsync(newFeature);

            decimal unitPrice = 0;
            foreach (var mat in request.Materials)
            {
                var material = await _MaterialRepository
                    .GetAll()
                    .FirstOrDefaultAsync(m => m.MaterialId == mat.MaterialId);

                if (material != null)
                {
                    unitPrice += (decimal)mat.MeterUsed * material.PricePerUnit;
                }
            }

            decimal laborCost = 0;
            //if (design.DesignTypes?.LaborHours != null && design.DesignTypes?.LaborCostPerHour != null)
            //{
            //    laborCost = ((decimal)design.DesignTypes.LaborHours.Value * design.DesignTypes.LaborCostPerHour.Value);
            //}

            decimal defaultSalePrice = unitPrice + laborCost;

            if (request.CustomSalePrice.HasValue)
            {
                var custom = request.CustomSalePrice.Value;

                // Giới hạn 0% - 20% markup
                if (custom < defaultSalePrice)
                    throw new Exception("Giá bán thấp hơn chi phí gốc. Vui lòng kiểm tra lại.");

                if (custom > defaultSalePrice * 1.2m)
                    throw new Exception("Giá bán không được vượt quá 20% so với chi phí gốc.");

                design.SalePrice = custom;
            }
            else
            {
                // Nếu không nhập thì gán mặc định
                design.SalePrice = defaultSalePrice;
            }


            design.UnitPrice = unitPrice;
            // Cập nhật footprint & stage
            design.CarbonFootprint= request.TotalCarbon;
            design.WaterUsage= request.TotalWater;
            design.WasteDiverted = request.TotalWaste;

            _designRepository.Update(design);
            await _designRepository.Commit();
            return true;
        }


        public async Task<bool> AddVariantAndUpdateMaterialsAsync(CreateDesignVariantRequest request, int userId)
        {
            // 🔐 DesignerId
            var designer = await _designerRepository
                .GetAll()
                .FirstOrDefaultAsync(d => d.UserId == userId);

            if (designer == null)
                throw new Exception("Không tìm thấy designer tương ứng với user này.");

            var designerId = designer.DesignerId;

            // 🎨 design
            var design = await _designRepository
                .GetAll()
                .Include(d => d.DesignsMaterials)
                    .ThenInclude(dm => dm.Materials)
                ////.Include(d => d.DesignTypes)
                .FirstOrDefaultAsync(d => d.DesignId == request.DesignId);

            if (design == null || design.DesignerId != designerId)
                throw new Exception("Không tìm thấy thiết kế hoặc bạn không có quyền tạo biến thể cho thiết kế này.");

            //// 📏 size multiplier
            //var ratio = await _DesignTypeSizeRatioRepository
            //    .GetAll()
            //    .FirstOrDefaultAsync(r =>
            //        r.DesignTypeId == design.DesignTypeId &&
            //        r.SizeId == request.SizeId);

            //float sizeMultiplier = ratio?.Ratio ?? 0;
            //if (sizeMultiplier == 0)
            //    throw new Exception("Không tìm thấy hệ số size phù hợp.");

            // 🔁 check  variant exist 
            //string normalizedColor = request.Color?.Trim().ToLower() ?? "";
            //var existingVariant = await _designVariantRepository
            //    .GetAll()
            //    .FirstOrDefaultAsync(v =>
            //        v.DesignId == request.DesignId &&
            //        v.SizeId == request.SizeId &&
            //        v.Color.ToLower() == normalizedColor);

            // 📦 check inventory and deduct materials.
            //foreach (var dm in design.DesignsMaterials)
            //{
            //    float required = dm.MeterUsed * sizeMultiplier * request.Quantity;

            //    var inventory = await _designerMaterialInventoryRepository
            //        .GetAll()
            //        .FirstOrDefaultAsync(i =>
            //            i.DesignerId == designerId &&
            //            i.MaterialId == dm.MaterialId);

            //    if (inventory == null || inventory.Quantity < required)
            //        throw new Exception($"Không đủ vật liệu [{dm.Materials?.Name}] trong kho.");

            //    inventory.Quantity -= (int)Math.Ceiling(required);
            //    _designerMaterialInventoryRepository.Update(inventory);
            //}

            // ➕ variant
            //if (existingVariant != null)
            //{
            //    existingVariant.Quantity += request.Quantity;
            //    _designVariantRepository.Update(existingVariant);
            //}
            //else
            //{
            //    var newVariant = new DesignsVariant
            //    {
            //        DesignId = request.DesignId,
            //        SizeId = request.SizeId,
            //        ColorCode = request.Color?.Trim(), 
            //    };

            //    await _designVariantRepository.AddAsync(newVariant);
            //}
         

            // 💾 Lưu thay đổi
            await _designerMaterialInventoryRepository.Commit();
            await _designVariantRepository.Commit();
            await _designRepository.Commit();

            return true;
        }







    }
}
