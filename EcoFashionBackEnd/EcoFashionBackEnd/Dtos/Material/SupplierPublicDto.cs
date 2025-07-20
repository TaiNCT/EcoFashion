namespace EcoFashionBackEnd.Dtos.Material
{
    public class SupplierPublicDto
    {
        public Guid SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public string? AvatarUrl { get; set; }
        public string? Bio { get; set; }
        public string? SpecializationUrl { get; set; }
        public string? PortfolioUrl { get; set; }
        public string? BannerUrl { get; set; }
        public double? Rating { get; set; }
        public int? ReviewCount { get; set; }
        public string? Certificates { get; set; }
    }
}
