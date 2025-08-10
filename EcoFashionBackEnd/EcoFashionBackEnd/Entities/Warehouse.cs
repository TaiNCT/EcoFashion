using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    public class Warehouse
    {
        public int WarehouseId { get; set; }
        public Guid DesignerId { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public virtual Designer Designer { get; set; }
        public string WarehouseType { get; set; } // "Material" hoặc "Product"
        public virtual ICollection<ProductInventory> ProductInventories { get; set; } = new List<ProductInventory>();

    }
}
