using EcoFashionBackEnd.Dtos.MaterialType;

namespace EcoFashionBackEnd.Dtos.Material
{
    public class MaterialModel
    {
        public int MaterialId { get; set; }
        public int TypeId { get; set; }
        public Guid SupplierId { get; set; }
        public required string MaterialName { get; set; }
        public string? MaterialDescription { get; set; }
        public double? SustainabilityScore { get; set; }
        public double? RecycledPercentage { get; set; }
        public int? QuantityAvailable { get; set; }
        public decimal? PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
        public MaterialTypeModel? Type { get; set; }
        public SupplierModel? Supplier { get; set; }
    }
}
