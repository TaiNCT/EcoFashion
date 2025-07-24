using EcoFashionBackEnd.Entities.EcoFashionBackEnd.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Materials")]
    public class Material
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaterialId { get; set; }

        [ForeignKey("SupplierProfile")]
        public Guid SupplierId { get; set; }
        public virtual Supplier SupplierProfile { get; set; }

        [ForeignKey("MaterialType")]
        public int TypeId { get; set; }
        public virtual MaterialType MaterialType { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal RecycledPercentage { get; set; }
        public int QuantityAvailable { get; set; }
        public decimal PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<MaterialImage> MaterialImages { get; set; }
        public virtual ICollection<MaterialSustainability> MaterialSustainabilityMetrics { get; set; }
        public virtual Blog? Blog { get; set; }
    }
}