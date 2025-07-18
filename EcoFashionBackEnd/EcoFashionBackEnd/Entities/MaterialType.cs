using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace EcoFashionBackEnd.Entities
{
    [Table("MaterialTypes")]
    public class MaterialType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TypeId { get; set; }
        public string? TypeName { get; set; }
        public ICollection<Material> Materials { get; set; } = new List<Material>();
    }
}