using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Material_Sustainability")]
    public class MaterialSustainability
    {
        [Required]
        public required int MaterialId { get; set; }
        [Required]
        public required int SustainabilityCriteriaId { get; set; }
        [ForeignKey("MaterialId")]
        public virtual Material? Material { get; set; }
        [ForeignKey("SustainabilityCriteriaId")]
        public virtual SustainabilityCriteria? SustainabilityCriteria { get; set; }
        [Required]
        public required decimal Value { get; set; }
    }
}
