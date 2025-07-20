using EcoFashionBackEnd.Entities;

namespace EcoFashionBackEnd.Dtos
{
    public class MaterialTypeBenchmarkModel
    {
        public int BenchmarkId { get; set; }
        public int TypeId { get; set; }
        public int CriteriaId { get; set; }
        public float Value { get; set; }
        public MaterialType? MaterialType { get; set; }
        public SustainabilityCriteria? SustainabilityCriteria { get; set; }
    }
}
