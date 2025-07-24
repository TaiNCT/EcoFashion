using EcoFashionBackEnd.Dtos.Material;

namespace EcoFashionBackEnd.Common.Payloads.Responses
{
    public class BlogDetailResponse
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
