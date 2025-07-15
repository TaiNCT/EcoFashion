using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Sustainability_Criteria")]
    public class SustainabilityCriteria
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SustainabilityCriteriaId { get; set; }
        [Required]
        public required string CriteriaName { get; set; }
        public string? Description { get; set; }
        public string? Unit { get; set; }
        public ICollection<MaterialSustainability> MaterialSustainabilities { get; set; } = new List<MaterialSustainability>();
    }
}
