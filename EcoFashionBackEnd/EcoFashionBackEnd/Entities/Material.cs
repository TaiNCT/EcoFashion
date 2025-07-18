using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Material")]
    public class Material
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaterialId { get; set; }
        public required int TypeId { get; set; }
        public required Guid SupplierId { get; set; }
        [ForeignKey(nameof(TypeId))]
        public MaterialType MaterialType { get; set; } = null!;
        [ForeignKey(nameof(SupplierId))]
        public Supplier Supplier { get; set; } = null!;
        [Required]
        public required string MaterialName { get; set; }
        public string? MaterialDescription { get; set; }
        public decimal? SustainabilityScore { get; set; }
        public decimal? RecycledPercentage { get; set; }
        public int? QuantityAvailable { get; set; }
        public decimal? PricePerUnit { get; set; }
        [Url]
        public string? DocumentationUrl { get; set; }
        public ICollection<SavedMaterial> SavedMaterials { get; set; } = new List<SavedMaterial>();
        public ICollection<DraftMaterial> DraftMaterials { get; set; } = new List<DraftMaterial>();
        public ICollection<MaterialSustainability> MaterialSustainabilities { get; set; } = new List<MaterialSustainability>();
        public ICollection<MaterialImage> MaterialImages { get; set; } = new List<MaterialImage>();
        public ICollection<DesignerMaterialInventory> DesignerMaterialInventories { get; set; } = new List<DesignerMaterialInventory>();
    }
}