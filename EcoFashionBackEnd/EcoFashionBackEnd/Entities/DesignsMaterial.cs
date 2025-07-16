using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Designs_Materials")]
    public class DesignsMaterial
    {
        [ForeignKey("DesignId")]
        public int DesignId { get; set; }
        public virtual Design Design { get; set; }

        [ForeignKey("SavedMaterialId")]
        public int SavedMaterialId { get; set; }
        //public virtual SavedMaterial SavedMaterial { get; set; } // Assuming SavedMaterial entity exists

        public float PersentageUsed { get; set; }

        [Key]
        [Column(Order = 0)]
        public int DesignIdPk { get; set; } // Composite Key Part 1

        [Key]
        [Column(Order = 1)]
        public int SavedMaterialIdPk { get; set; } // Composite Key Part 2
        public Guid SupplierId { get; internal set; }
        public string MaterialName { get; internal set; }
        public string Description { get; internal set; }
        public int Price { get; internal set; }
        public int AvailableQuantity { get; internal set; }
        public string Unit { get; internal set; }
        public DateTime CreatedAt { get; internal set; }
        public string Status { get; internal set; }
    }
}