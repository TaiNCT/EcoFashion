using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Materials")]
    public class Material
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid MaterialId { get; set; }
        public Guid TypeId { get; set; }
        public Guid SupplierId { get; set; }
        [ForeignKey(nameof(TypeId))]
        public required MaterialType MaterialType { get; set; }
        [ForeignKey(nameof(SupplierId))]
        public required Supplier Supplier { get; set; }
        [Required]
        public required string MaterialName { get; set; }
        public string? MaterialDescription { get; set; }
        public double? SustainabilityScore { get; set; }
        public double? RecycledPercentage { get; set; }
        public int? QuantityAvailable { get; set; }
        public decimal? PricePerUnit { get; set; }
        [Url]
        public string? DocumentationUrl { get; set; }
        public ICollection<DraftMaterial> DraftMaterials { get; set; } = new List<DraftMaterial>();
        public ICollection<MaterialImage> MaterialImages { get; set; } = new List<MaterialImage>();
        public ICollection<MaterialSustainability> MaterialSustainabilities { get; set; } = new List<MaterialSustainability>();
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public ICollection<SavedMaterial> SavedMaterials { get; set; } = new List<SavedMaterial>();
    }
}
