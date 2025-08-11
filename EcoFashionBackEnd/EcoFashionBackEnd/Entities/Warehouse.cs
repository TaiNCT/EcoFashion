<<<<<<< HEAD
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


=======
﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Warehouses")]
    public class Warehouse
    {
        public int WarehouseId { get; set; }
        public Guid DesignerId { get; set; }
        public virtual Designer Designer { get; set; }
        public string WarehouseType { get; set; } // "Material" hoặc "Product"
        public virtual ICollection<ProductInventory> ProductInventories { get; set; } = new List<ProductInventory>();

    }
}
>>>>>>> 73fc58726349d17ec8fd03c3eafc6f15ec1d5275
