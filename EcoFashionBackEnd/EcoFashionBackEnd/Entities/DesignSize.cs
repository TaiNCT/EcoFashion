using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignSizes")]
    public class DesignSize
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SizeId { get; set; }
        [Required]
        public required string SizeName { get; set; }
        [Required]
        public required string SizeDescription { get; set; }
        public ICollection<DesignVarient> DesignVarients { get; set; } = new List<DesignVarient>();
        public ICollection<DesignType> DesignTypes { get; set; } = new List<DesignType>();
    }
}
