using EcoFashionBackEnd.Entities.EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Dtos.Material
{
    public class MaterialDetailDto
    {
        public int MaterialId { get; set; }
        public string? MaterialTypeName { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public float RecycledPercentage { get; set; }
        public int QuantityAvailable { get; set; }
        public decimal PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
        public float? AvgRating { get; set; }
        public int? ReviewCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> ImageUrls { get; set; } = new List<string>();
        public List<SustainabilityCriterionDto> SustainabilityCriteria { get; set; } = new List<SustainabilityCriterionDto>();
        public List<MaterialTypeBenchmarkDto> Benchmarks { get; set; } = new List<MaterialTypeBenchmarkDto>();
        public SupplierPublicDto Supplier { get; set; }
    }
}
