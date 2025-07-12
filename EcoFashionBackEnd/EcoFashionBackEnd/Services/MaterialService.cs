using AutoMapper;
using EcoFashionBackEnd.Dtos.Material;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Services
{
    public class MaterialService
    {
        private readonly IRepository<Material,int> _materialRepository;
        private readonly IRepository<Supplier,int> _supplierRepository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;
        public MaterialService (IRepository<Material,int> materialRepository,
            IRepository<Supplier,int> supplierRepository,
            AppDbContext dbContext,
            IMapper mapper)
        {
            _materialRepository = materialRepository;
            _supplierRepository = supplierRepository;
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public async Task<MaterialModel?> GetMaterialByIdAsync(int id)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null)
                return null;
            return _mapper.Map<MaterialModel>(material);
        }
        public async Task<IEnumerable<MaterialModel>> GetAllMaterialsAsync()
        {
            var materials = await _materialRepository.GetAll().ToListAsync();
            return _mapper.Map<List<MaterialModel>>(materials);
        }
        public async Task<MaterialModel> CreateMaterialAsync(MaterialRequest request)
        {
            var material = _mapper.Map<Material>(request);
            await _materialRepository.AddAsync(material);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<MaterialModel>(material);
        }
        public async Task<MaterialModel?> UpdateMaterialAsync(int id, MaterialRequest model)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null)
                return null;

            _mapper.Map(model, material);
            _materialRepository.Update(material);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<MaterialModel>(material);
        }
        public async Task<bool> DeleteMaterialAsync(int id)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null)
                return false;

            _materialRepository.Remove(id);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
