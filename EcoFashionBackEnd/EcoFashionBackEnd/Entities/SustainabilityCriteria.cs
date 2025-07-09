using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("SustainabilityCriterias")]
    public class SustainabilityCriteria
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CriterionId { get; set; }
        [Required]
        public required string CriterionName { get; set; }
        public string? CriterionDescription { get; set; }
        public double? Weight { get; set; }
        public string? Unit { get; set; }
        public ICollection<MaterialSustainability> MaterialSustainabilities { get; set; } = new List<MaterialSustainability>();
    }
}
