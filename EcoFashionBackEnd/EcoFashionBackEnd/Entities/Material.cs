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
        public float SustainabilityScore { get; set; }
        public float RecycledPercentage { get; set; }
        public int QuantityAvailable { get; set; }
        public decimal PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }

        public virtual ICollection<MaterialImage> MaterialImages { get; set; }
        public virtual ICollection<MaterialSustainability> MaterialSustainabilityMetrics { get; set; }
        public ICollection<SavedMaterial> SavedMaterials { get; set; } = new List<SavedMaterial>();
        public ICollection<DraftMaterial> DraftMaterials { get; set; } = new List<DraftMaterial>();
        public ICollection<DesignerMaterialInventory> DesignerMaterialInventories { get; set; } = new List<DesignerMaterialInventory>();
    }
}