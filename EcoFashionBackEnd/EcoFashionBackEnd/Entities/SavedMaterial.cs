using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("SavedMaterials")]
    public class SavedMaterial
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SavedMaterialId { get; set; }
        public Guid DesignerId { get; set; }
        public Guid MaterialId { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public required Designer Designer { get; set; }
        [ForeignKey(nameof(MaterialId))]
        public required Material Material { get; set; }
        public ICollection<DesignMaterial> DesignMaterials { get; set; } = new List<DesignMaterial>();
    }
}
