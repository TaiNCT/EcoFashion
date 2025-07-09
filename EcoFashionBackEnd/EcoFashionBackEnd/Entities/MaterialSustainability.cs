using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("MaterialSustainabilities")]
    public class MaterialSustainability
    {
        public Guid MaterialId { get; set; }
        public Guid CriterionId { get; set; }
        [ForeignKey(nameof(MaterialId))]
        public required Material Material {  get; set; }
        [ForeignKey(nameof(CriterionId))]
        public required SustainabilityCriteria SustainabilityCriteria { get; set; }
        public double? Value { get; set; }
        public ICollection<MaterialSustainability> MaterialSustainabilities { get; set; } = new List<MaterialSustainability>();
    }
}
