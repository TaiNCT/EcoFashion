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
        public int TypeId { get; set; }
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
    }
}