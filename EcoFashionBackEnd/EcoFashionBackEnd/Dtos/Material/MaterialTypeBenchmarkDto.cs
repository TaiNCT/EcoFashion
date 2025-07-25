namespace EcoFashionBackEnd.Dtos.Material
{
    public class MaterialTypeBenchmarkDto
    {
        public int CriterionId { get; set; }
        public string? CriterionName { get; set; }
        public decimal BenchmarkValue { get; set; }
        public decimal ActualValue { get; set; }
        public decimal ImprovementPercentage { get; set; }
    }
} 