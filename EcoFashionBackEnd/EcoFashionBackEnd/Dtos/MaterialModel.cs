namespace EcoFashionBackEnd.Dtos
{
    public class MaterialModel
    {
        public int MaterialId { get; set; }
        public Guid SupplierId { get; set; }
        public int TypeId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public float SustainabilityScore { get; set; }
        public float RecycledPercentage { get; set; }
        public int QuantityAvailable { get; set; }
        public decimal PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
        public MaterialTypeModel? Type { get; set; }
        public SupplierModel? Supplier { get; set; }
    }
}
