using System;

namespace EcoFashionBackEnd.Entities
{
    public class Warehouse
    {
        public int WarehouseId { get; set; }
        public string? Name { get; set; }

        // Material/Product/Other - for this phase always "Material"
        public string Type { get; set; } = "Material";

        // If null → global/admin warehouse
        public Guid? SupplierId { get; set; }

        public bool IsDefault { get; set; }
        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? Address { get; set; }
        public string? Note { get; set; }
    }
}


