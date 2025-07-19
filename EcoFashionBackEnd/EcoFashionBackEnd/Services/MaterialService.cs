using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IEnumerable<MaterialModel>> GetAllMaterialsAsync()
        {
            var materials = await _materialRepository.GetAll().ToListAsync();
            return _mapper.Map<List<MaterialModel>>(materials);
        }
        public async Task<MaterialModel> CreateMaterialAsync(int userId, MaterialRequest request)
        {
            var supplier = await _dbContext.Suppliers
                .FirstOrDefaultAsync(s => s.UserId == userId);
            if (supplier == null)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp");
            var material = _mapper.Map<Material>(request);
            material.SupplierId = supplier.SupplierId;
            await _materialRepository.AddAsync(material);
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
