using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Image")]
    public class Image
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ImageId { get; set; }

        public string? ImageUrl { get; set; }
        [Required]
        [Url]
        public required string ImageUrl { get; set; }
        public ICollection<MaterialImage> MaterialImages { get; set; } = new List<MaterialImage>();
    }
}