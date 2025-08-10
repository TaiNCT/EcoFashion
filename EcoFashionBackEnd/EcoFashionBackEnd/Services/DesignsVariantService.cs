using EcoFashionBackEnd.Common.Payloads.Requests.Variant;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Services
{
    public class DesignsVariantService
    {
        private readonly IRepository<DesignsVariant, int> _designVariantRepository;
        private readonly IRepository<Design, int> _designRepository;
        private readonly IRepository<Size, int> _sizeRepository;


        public DesignsVariantService(
            IRepository<DesignsVariant, int> designVariantRepository,
            IRepository<Design, int> designRepository,
            IRepository<Size, int> sizeRepository)
        {
            _designVariantRepository = designVariantRepository;
            _designRepository = designRepository;
            _sizeRepository = sizeRepository;
        }

        public async Task<List<DesignsVariant>> GetVariantsByDesignIdAsync(int designId)
        {
            return await _designVariantRepository.GetAll()
                .Where(v => v.DesignId == designId)
                .Include(v => v.Size)
                .ToListAsync();
        }

        public async Task<DesignsVariant> GetVariantByIdAsync(int variantId)
        {
            return await _designVariantRepository.GetAll()
                .Include(v => v.Size)
                .FirstOrDefaultAsync(v => v.Id == variantId);
        }

        public async Task<bool> CreateVariantAsync(int designId, DesignsVariantCreateRequest request)
        {
            var design = await _designRepository.GetByIdAsync(designId);
            if (design == null) return false;

            var size = await _sizeRepository.GetByIdAsync(request.SizeId);
            if (size == null) throw new Exception("Size không tồn tại.");

            var variant = new DesignsVariant
            {
                DesignId = designId,
                SizeId = request.SizeId,
                ColorCode = request.ColorCode
            };

            await _designVariantRepository.AddAsync(variant);
            await _designVariantRepository.Commit();
            return true;
        }

        public async Task<bool> UpdateVariantAsync(int variantId, DesignsVariantUpdateRequest request)
        {
            var variant = await _designVariantRepository.GetByIdAsync(variantId);
            if (variant == null) return false;

            var size = await _sizeRepository.GetByIdAsync(request.SizeId);
            if (size == null) throw new Exception("Size không tồn tại.");

            variant.SizeId = request.SizeId;
            variant.ColorCode = request.ColorCode;

            _designVariantRepository.Update(variant);
            await _designVariantRepository.Commit();
            return true;
        }

        public async Task<bool> DeleteVariantAsync(int variantId)
        {
            var variant = await _designVariantRepository.GetByIdAsync(variantId);
            if (variant == null) return false;

            //_designVariantRepository.Remove();
            await _designVariantRepository.Commit();
            return true;
        }
    }

}
