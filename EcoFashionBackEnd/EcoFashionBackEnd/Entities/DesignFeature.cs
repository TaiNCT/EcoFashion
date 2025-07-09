using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignFeatures")]
    public class DesignFeature
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid FeatureId { get; set; }
        public Guid DesignId { get; set; }
        [ForeignKey(nameof(FeatureId))]
        public required Design Design { get; set; }
        public bool ReduceWaste { get; set; }
        public int RecycledMaterials { get; set; }
        public bool LowImpactDyes { get; set; }
        public bool Durable { get; set; }
        public bool EthicallyManufactured { get; set; }
    }
}
