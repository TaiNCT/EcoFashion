using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Entities
{
    [Table("MaterialTypes")]
    public class MaterialType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TypeId { get; set; }

        public string? TypeName { get; set; }
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }
        [StringLength(200)]
        [Url]
        public string? ImageUrl { get; set; }
        public ICollection<Material> Materials { get; set; } = new List<Material>();
    }
}