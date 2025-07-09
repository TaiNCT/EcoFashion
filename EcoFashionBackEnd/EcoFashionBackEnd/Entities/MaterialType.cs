using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Entities
{
    [Table("MaterialType")]
    public class MaterialType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TypeId { get; set; }
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }
        [StringLength(200)]
        [Url]
        public string? ImageUrl { get; set; }
        public ICollection<Material> Materials { get; set; } = new List<Material>();
    }
}
