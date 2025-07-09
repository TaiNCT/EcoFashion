using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignTypes")]
    public class DesignType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DesignTypeId { get; set; }
        public Guid SizeId { get; set; }
        [ForeignKey(nameof(SizeId))]
        public required DesignSize DesignSize { get; set; }
        public string? DesignTypeName { get; set; }
        public double? Meter { get; set; }
    }
}
