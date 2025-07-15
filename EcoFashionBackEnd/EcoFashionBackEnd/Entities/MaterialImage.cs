using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Material_Image")]
    public class MaterialImage
    {
        [Required]
        public required int MaterialId { get; set; }
        [ForeignKey("MaterialId")]
        public virtual Material? Material { get; set; }
        [Required]
        public required int ImageId { get; set; }
        [ForeignKey("ImageId")]
        public virtual Image? Image { get; set; }
    }
}
