using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignMaterials")]
    public class DesignMaterial
    {
        public Guid DesignId { get; set; }
        public Guid SavedMaterialId { get; set; }
        [ForeignKey(nameof(DesignId))]
        public required Design Design { get; set; }
        [ForeignKey(nameof(SavedMaterialId))]
        public required SavedMaterial SavedMaterial { get; set; }
        public double? PercentageUsed { get; set; }
    }
}
