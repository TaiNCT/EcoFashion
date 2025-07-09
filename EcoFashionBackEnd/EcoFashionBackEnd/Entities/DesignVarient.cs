using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignVarients")]
    public class DesignVarient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid VarientId { get; set; }
        public Guid SizeId { get; set; }
        public Guid DesignId { get; set; }
        public Guid ColorId { get; set; }
        [ForeignKey(nameof(SizeId))]
        public required DesignSize DesignSize { get; set; }
        [ForeignKey(nameof(DesignId))]
        public required DesignDraft DesignDraft { get; set; }
        [ForeignKey(nameof (ColorId))]
        public required DesignColor DesignColor { get; set; }
        public int? Quantity { get; set; }
        public double? CarbonFootprint { get; set; }
        public double? WaterUsage { get; set; }
        public double? WaterDiverted { get; set; }
    }
}
