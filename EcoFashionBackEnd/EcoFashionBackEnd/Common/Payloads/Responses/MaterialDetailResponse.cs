using EcoFashionBackEnd.Dtos.Material;
using System;

namespace EcoFashionBackEnd.Common.Payloads.Responses
{
    public class MaterialDetailResponse
    {
        public int MaterialId { get; set; }
        public string? MaterialTypeName { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal RecycledPercentage { get; set; }
        public int QuantityAvailable { get; set; }
        public decimal PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string>? ImageUrls { get; set; }
        public List<SustainabilityCriterionDto> SustainabilityCriteria { get; set; } = new List<SustainabilityCriterionDto>();
        public List<MaterialTypeBenchmarkDto> Benchmarks { get; set; } = new List<MaterialTypeBenchmarkDto>();
        public SupplierPublicDto Supplier { get; set; }
    }
}
