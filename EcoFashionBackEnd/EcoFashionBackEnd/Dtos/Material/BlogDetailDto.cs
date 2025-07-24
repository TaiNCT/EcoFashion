namespace EcoFashionBackEnd.Dtos.Material
{
    public class BlogdDetailResponse
    {
        public int BlogId { get; set; }
        public required SupplierPublicDto Supplier { get; set; }
        public required MaterialDetailDto Material { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
