using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Material;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;
using System;

namespace EcoFashionBackEnd.Services
{
    public class MaterialService
    {
        private readonly IRepository<Material,int> _materialRepository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;
        public MaterialService (IRepository<Material,int> materialRepository,
            IRepository<Supplier,int> supplierRepository,
            AppDbContext dbContext,
            IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public async Task<MaterialModel?> GetMaterialByIdAsync(int id)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            return _mapper.Map<MaterialModel>(material);
        }
        public async Task<MaterialDetailResponse?> GetMaterialDetailByIdAsync(int id)
        {
            var material = await _dbContext.Materials
                .Include(m => m.SupplierProfile)
                .Include(m => m.MaterialImages).ThenInclude(mi => mi.Image)
                .Include(m => m.MaterialSustainabilityMetrics).ThenInclude(ms => ms.SustainabilityCriterion)
                .Include(m => m.MaterialType)
                .FirstOrDefaultAsync(m => m.MaterialId == id);
            if (material == null) return null;

            // Get benchmarks for this material type
            var benchmarks = await _dbContext.MaterialTypesBenchmarks
                .Include(b => b.SustainabilityCriteria)
                .Where(b => b.TypeId == material.TypeId)
                .ToListAsync();

            return new MaterialDetailResponse
            {
                MaterialId = material.MaterialId,
                Name = material.Name,
                Description = material.Description,
                RecycledPercentage = material.RecycledPercentage,
                QuantityAvailable = material.QuantityAvailable,
                PricePerUnit = material.PricePerUnit,
                DocumentationUrl = material.DocumentationUrl,
                MaterialTypeName = material.MaterialType?.TypeName,
                ImageUrls = material.MaterialImages.Select(mi => mi.Image.ImageUrl).ToList(),
                SustainabilityCriteria = material.MaterialSustainabilityMetrics.Select(ms => new SustainabilityCriterionDto
                {
                    CriterionId = ms.SustainabilityCriterion.CriterionId,
                    Name = ms.SustainabilityCriterion.Name,
                    Description = ms.SustainabilityCriterion.Description,
                    Unit = ms.SustainabilityCriterion.Unit,
                    Value = ms.Value
                }).ToList(),
                Benchmarks = benchmarks.Select(b => {
                    var actualValue = material.MaterialSustainabilityMetrics
                        .FirstOrDefault(ms => ms.CriterionId == b.CriteriaId)?.Value ?? 0;
                    var improvementPercentage = b.Value > 0 ? ((b.Value - actualValue) * 100 / b.Value) : 0;
                    
                    return new MaterialTypeBenchmarkDto
                    {
                        CriterionId = b.CriteriaId,
                        CriterionName = b.SustainabilityCriteria.Name,
                        BenchmarkValue = b.Value,
                        ActualValue = actualValue,
                        ImprovementPercentage = Math.Round(improvementPercentage, 2)
                    };
                }).ToList(),
                CreatedAt = material.CreatedAt,
                Supplier = new SupplierPublicDto
                {
                    SupplierId = material.SupplierProfile.SupplierId,
                    SupplierName = material.SupplierProfile.SupplierName,
                    AvatarUrl = material.SupplierProfile.AvatarUrl,
                    Bio = material.SupplierProfile.Bio,
                    SpecializationUrl = material.SupplierProfile.SpecializationUrl,
                    PortfolioUrl = material.SupplierProfile.PortfolioUrl,
                    BannerUrl = material.SupplierProfile.BannerUrl,
                    Rating = material.SupplierProfile.Rating,
                    ReviewCount = material.SupplierProfile.ReviewCount,
                    Certificates = material.SupplierProfile.Certificates
                },
            };
        }
        public async Task<IEnumerable<MaterialDetailDto>> GetAllMaterialsAsync()
        {
            var materials = await _dbContext.Materials
                .Include(m => m.SupplierProfile)
                .Include(m => m.MaterialImages).ThenInclude(mi => mi.Image)
                .Include(m => m.MaterialSustainabilityMetrics).ThenInclude(ms => ms.SustainabilityCriterion)
                .Include(m => m.MaterialType)
                .ToListAsync();

            // Get all benchmarks for the material types
            var materialTypeIds = materials.Select(m => m.TypeId).Distinct().ToList();
            var benchmarks = await _dbContext.MaterialTypesBenchmarks
                .Include(b => b.SustainabilityCriteria)
                .Where(b => materialTypeIds.Contains(b.TypeId))
                .ToListAsync();

            return materials.Select(material => new MaterialDetailDto
            {
                MaterialId = material.MaterialId,
                Name = material.Name,
                Description = material.Description,
                RecycledPercentage = (float)material.RecycledPercentage,
                QuantityAvailable = material.QuantityAvailable,
                PricePerUnit = material.PricePerUnit,
                DocumentationUrl = material.DocumentationUrl,
                MaterialTypeName = material.MaterialType?.TypeName,
                ImageUrls = material.MaterialImages.Select(mi => mi.Image.ImageUrl).ToList(),
                SustainabilityCriteria = material.MaterialSustainabilityMetrics.Select(ms => new SustainabilityCriterionDto
                {
                    CriterionId = ms.SustainabilityCriterion.CriterionId,
                    Name = ms.SustainabilityCriterion.Name,
                    Description = ms.SustainabilityCriterion.Description,
                    Unit = ms.SustainabilityCriterion.Unit,
                    Value = ms.Value
                }).ToList(),
                Benchmarks = benchmarks
                    .Where(b => b.TypeId == material.TypeId)
                    .Select(b => {
                        var actualValue = material.MaterialSustainabilityMetrics
                            .FirstOrDefault(ms => ms.CriterionId == b.CriteriaId)?.Value ?? 0;
                        var improvementPercentage = b.Value > 0 ? ((b.Value - actualValue) * 100 / b.Value) : 0;
                        
                        return new MaterialTypeBenchmarkDto
                        {
                            CriterionId = b.CriteriaId,
                            CriterionName = b.SustainabilityCriteria.Name,
                            BenchmarkValue = b.Value,
                            ActualValue = actualValue,
                            ImprovementPercentage = Math.Round(improvementPercentage, 2)
                        };
                    }).ToList(),
                CreatedAt = material.CreatedAt,
                Supplier = new SupplierPublicDto
                {
                    SupplierId = material.SupplierProfile.SupplierId,
                    SupplierName = material.SupplierProfile.SupplierName,
                    AvatarUrl = material.SupplierProfile.AvatarUrl,
                    Bio = material.SupplierProfile.Bio,
                    SpecializationUrl = material.SupplierProfile.SpecializationUrl,
                    PortfolioUrl = material.SupplierProfile.PortfolioUrl,
                    BannerUrl = material.SupplierProfile.BannerUrl,
                    Rating = material.SupplierProfile.Rating,
                    ReviewCount = material.SupplierProfile.ReviewCount,
                    Certificates = material.SupplierProfile.Certificates
                }
            }).ToList();
        }
        public async Task<MaterialModel> CreateMaterialAsync(int userId, MaterialRequest request)
        {
            var supplier = await _dbContext.Suppliers
                .FirstOrDefaultAsync(s => s.UserId == userId);
            if (supplier == null)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp");

            var material = _mapper.Map<Material>(request);
            material.SupplierId = supplier.SupplierId;
            material.CreatedAt = DateTime.UtcNow;

            await _materialRepository.AddAsync(material);
            await _dbContext.SaveChangesAsync(); // Save to get MaterialId

            var sustainabilities = new List<MaterialSustainability>
                {
                    new() { MaterialId = material.MaterialId, CriterionId = 1, Value = request.materialSustainabilityCriteria1 },
                    new() { MaterialId = material.MaterialId, CriterionId = 2, Value = request.materialSustainabilityCriteria2 },
                    new() { MaterialId = material.MaterialId, CriterionId = 3, Value = request.materialSustainabilityCriteria3 }
                };
            await _dbContext.MaterialSustainabilities.AddRangeAsync(sustainabilities);
            await _dbContext.SaveChangesAsync();

            var benchmarks = await _dbContext.MaterialTypesBenchmarks
                .Where(b => b.TypeId == material.TypeId).ToListAsync();

            var improvements = benchmarks
                .Join(sustainabilities,
                      benchmark => benchmark.CriteriaId,
                      actual => actual.CriterionId,
                      (benchmark, actual) => new
                      {
                          Benchmark = benchmark.Value,
                          Actual = actual.Value
                      })
                .Where(x => x.Benchmark > 0)
                .Select(x => (x.Benchmark - x.Actual) * 100 / x.Benchmark)
                .ToList();

            material.RecycledPercentage = (decimal)(improvements.Count != 0
                ? Math.Round(improvements.Average(), 2) : 0);

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<MaterialModel>(material);
        }

        public async Task<MaterialModel?> UpdateMaterialAsync(int userId, int materialId, MaterialRequest request)
        {
            var supplier = await _dbContext.Suppliers
                .FirstOrDefaultAsync(s => s.UserId == userId);
            if (supplier == null)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp");
            
            var material = await _materialRepository.GetByIdAsync(materialId);
            if (material == null)
                return null;

            if (material.SupplierId != supplier.SupplierId)
                throw new ArgumentException("Bạn không có quyền sửa vật liệu này");

            _mapper.Map(request, material);
            _materialRepository.Update(material);
            await _dbContext.SaveChangesAsync();

            // Update sustainability values
            var sustainabilities = await _dbContext.MaterialSustainabilities
                .Where(ms => ms.MaterialId == material.MaterialId)
                .ToListAsync();
            foreach (var sustainability in sustainabilities)
            {
                switch (sustainability.CriterionId)
                {
                    case 1:
                        sustainability.Value = request.materialSustainabilityCriteria1;
                        break;
                    case 2:
                        sustainability.Value = request.materialSustainabilityCriteria2;
                        break;
                    case 3:
                        sustainability.Value = request.materialSustainabilityCriteria3;
                        break;
                }
            }
            await _dbContext.SaveChangesAsync();

            // Recalculate RecycledPercentage
            var benchmarks = await _dbContext.MaterialTypesBenchmarks
                .Where(b => b.TypeId == material.TypeId)
                .ToListAsync();

            var improvements = benchmarks
                .Join(sustainabilities,
                      benchmark => benchmark.CriteriaId,
                      actual => actual.CriterionId,
                      (benchmark, actual) => new
                      {
                          Benchmark = benchmark.Value,
                          Actual = actual.Value
                      })
                .Where(x => x.Benchmark > 0)
                .Select(x => ((x.Benchmark - x.Actual) * 100) / x.Benchmark)
                .ToList();

            material.RecycledPercentage = (decimal)(improvements.Count != 0
                ? Math.Round(improvements.Average(), 2)
                : 0);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<MaterialModel>(material);
        }
        public async Task<bool> DeleteMaterialAsync(int userId, int materialId)
        {
            var supplier = await _dbContext.Suppliers
                .FirstOrDefaultAsync(s => s.UserId == userId);
            if (supplier == null)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp");
            var material = await _materialRepository.GetByIdAsync(materialId);
            if (material == null)
                return false;
            if (material.SupplierId != supplier.SupplierId)
                throw new ArgumentException("Bạn không có quyền xóa vật liệu này");
            _materialRepository.Remove(materialId);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
