using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Services
{
    public class InventoryService
    {
        private readonly IRepository<Product, int> _productRepository;
        private readonly IRepository<ProductInventory, int> _productInventoryRepository;
        private readonly IRepository<DesignerMaterialInventory, int> _designerMaterialInventory;


        public InventoryService(
          IRepository<Product, int> productRepository,
          IRepository<ProductInventory, int> productInventoryRepository,
          IRepository<DesignerMaterialInventory, int> designerMaterialInventory

          )
        {
            _productRepository = productRepository;
            _productInventoryRepository = productInventoryRepository;
            _designerMaterialInventory = designerMaterialInventory;
        }

        public async Task AddProductInventoriesAsync(List<(int productId, int warehouseId, int quantity)> changes)
        {
            var now = DateTime.UtcNow;

            // Lấy hết tất cả các inventory cần update cùng lúc để giảm số query
            var productIds = changes.Select(c => c.productId).Distinct().ToList();
            var warehouseIds = changes.Select(c => c.warehouseId).Distinct().ToList();

            var existingInventories = await _productInventoryRepository.GetAll()
                .Where(pi => productIds.Contains(pi.ProductId) && warehouseIds.Contains(pi.WarehouseId))
                .ToListAsync();

            foreach (var change in changes)
            {
                var inventory = existingInventories
                    .FirstOrDefault(pi => pi.ProductId == change.productId && pi.WarehouseId == change.warehouseId);

                if (inventory == null)
                {
                    inventory = new ProductInventory
                    {
                        ProductId = change.productId,
                        WarehouseId = change.warehouseId,
                        QuantityAvailable = change.quantity,
                        LastUpdated = now,
                    };
                    await _productInventoryRepository.AddAsync(inventory);
                    existingInventories.Add(inventory);
                }
                else
                {
                    inventory.QuantityAvailable += change.quantity;
                    inventory.LastUpdated = now;
                    _productInventoryRepository.Update(inventory);
                }
            }

            await _productInventoryRepository.Commit();
        }

        public async Task DeductMaterialsAsync(Guid designerId, Dictionary<int, decimal> usageMap)
        {
            var materialIds = usageMap.Keys.ToList();

            var inventories = await _designerMaterialInventory.GetAll()
                .Where(i => i.DesignerId == designerId && materialIds.Contains(i.MaterialId))
                .ToListAsync();

            foreach (var materialId in usageMap.Keys)
            {
                var inventory = inventories.FirstOrDefault(i => i.MaterialId == materialId);

                if (inventory == null)
                    throw new Exception($"Không tìm thấy kho vật liệu MaterialId={materialId} của designer");

                var requiredQty = (int)usageMap[materialId];
                if (inventory.Quantity < requiredQty)
                    throw new Exception($"Kho vật liệu không đủ cho MaterialId={materialId}");

                inventory.Quantity -= requiredQty;
                _designerMaterialInventory.Update(inventory);
            }

            await _designerMaterialInventory.Commit();
        }

    }
}
