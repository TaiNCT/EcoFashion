using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Saved_Material")]
    public class SavedMaterial
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SavedMaterialId { get; set; }
        [Required]
        public required Guid DesignerId { get; set; }
        [Required]
        public required int MaterialId { get; set; }
        [ForeignKey("DesignerId")]
        public virtual Designer? Designer { get; set; }
        [ForeignKey("MaterialId")]
        public virtual Material? Material { get; set; }
    }
}
