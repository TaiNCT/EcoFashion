namespace EcoFashionBackEnd.Dtos.Material
{
    public class SustainabilityCriterionDto
    {
        public int CriterionId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Unit { get; set; }
        public decimal Value { get; set; }
    }
} 