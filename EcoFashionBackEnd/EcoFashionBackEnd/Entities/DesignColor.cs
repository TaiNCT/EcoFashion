using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignColors")]
    public class DesignColor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ColorId { get; set; }
        [Required]
        public required string ColorName { get; set; }
        public string? ColorCode { get; set; }
        public ICollection<DesignVarient> DesignVarients { get; set; } = new List<DesignVarient>();
    }
}
