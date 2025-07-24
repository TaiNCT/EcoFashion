using EcoFashionBackEnd.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Dtos
{
    public class BlogModel
    {
        public int BlogId { get; set; }
        public required Guid SupplierId { get; set; }
        public required int MaterialId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
