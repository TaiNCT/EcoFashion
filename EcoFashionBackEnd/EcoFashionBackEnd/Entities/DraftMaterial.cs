using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Draft_Material")]
    public class DraftMaterial
    {
        [Required]
        public required int DesignDraftId { get; set; }
        [ForeignKey("DesignDraftId")]
        public virtual DesignDraft? DesignDraft { get; set; }
        [Required]
        public required int MaterialId { get; set; }
        [ForeignKey("MaterialId")]
        public virtual Material? Material { get; set; }
        public decimal? PercentageUsed { get; set; }
    }
}
