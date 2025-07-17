using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("MaterialSustainabilitys")]
    public class MaterialSustainability
    {
        [Key, Column(Order = 0)]
        public int MaterialId { get; set; }

        [Key, Column(Order = 1)]
        public int CriterionId { get; set; }

        public float Value { get; set; }

        [ForeignKey("MaterialId")]
        public virtual Material Material { get; set; }

        [ForeignKey("CriterionId")]
        public virtual SustainabilityCriteria SustainabilityCriterion { get; set; }
    }

}