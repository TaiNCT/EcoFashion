using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("MaterialImage")]
    public class MaterialImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid MaterialImageId { get; set; }
        public Guid MaterialId { get; set; }
        public Guid ImageId { get; set; }
        [ForeignKey(nameof(MaterialId))]
        public required Material Material { get; set; }
        [ForeignKey(nameof(ImageId))]
        public required Image Image { get; set; }
    }
}
