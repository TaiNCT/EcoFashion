namespace EcoFashionBackEnd.Dtos
{
    public class DesignVariantModel
    {
        public int Id { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public int Quantity { get; set; }
        public float? CarbonFootprint { get; set; }
        public float? WaterUsage { get; set; }
        public float? WasteDiverted { get; set; }

        // Optional nếu cần map thêm info
        public string? SizeName { get; set; }
        public string? ColorName { get; set; }
        public string? ColorCode { get; set; }
    }

}
