namespace EcoFashionBackEnd.Dtos
{
    public class MaterialModel
    {
        public int MaterialId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public float RecycledPercentage { get; set; }
        public int QuantityAvailable { get; set; }
        public decimal PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
    }
}
