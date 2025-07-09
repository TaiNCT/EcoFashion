using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Images")]
    public class Image
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ImageId { get; set; }
        [Required]
        [StringLength(200)]
        [Url]
        public required string ImageUrl { get; set; }
        public ICollection<DesignImage> DesignImages { get; set; } = new List<DesignImage>();
        public ICollection<MaterialImage> MaterialImages { get; set; } = new List<MaterialImage>();
    }
}
