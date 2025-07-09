using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DraftMaterial")]
    public class DraftMaterial
    {
        public Guid DraftId { get; set; }
        public Guid MaterialId { get; set; }
        [ForeignKey(nameof(DraftId))]
        public required DesignDraft DesignDraft { get; set; }
        [ForeignKey(nameof(MaterialId))]
        public required Material Material { get; set; }
        public double? PercentageUsed { get; set; }
    }
}
