using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Designs_Materials")]
    public class DesignsMaterial
    {
        [ForeignKey("DesignId")]
        public int DesignId { get; set; }
        public virtual Design Design { get; set; }

        [ForeignKey("SavedMaterialId")]
        public int SavedMaterialId { get; set; }
        //public virtual SavedMaterial SavedMaterial { get; set; } // Assuming SavedMaterial entity exists

        public float PersentageUsed { get; set; }

        [Key]
        [Column(Order = 0)]
        public int DesignIdPk { get; set; } // Composite Key Part 1

        [Key]
        [Column(Order = 1)]
        public int SavedMaterialIdPk { get; set; } // Composite Key Part 2
    }
}