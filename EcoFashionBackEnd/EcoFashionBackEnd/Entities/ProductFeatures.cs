using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignFeature")]
    public class DesignFeature
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeatureId { get; set; }

        public int DesignId { get; set; }
        [ForeignKey(nameof(DesignId))]
        public virtual Design Design{ get; set; }

        public bool ReduceWaste { get; set; }
        public bool LowImpactDyes { get; set; }
        public bool Durable { get; set; }
        public bool EthicallyManufactured { get; set; }
    }
}