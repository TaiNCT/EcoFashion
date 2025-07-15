using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Design_Draft")]
    public class DesignDraft
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DesignDraftId { get; set; }
        [Required]
        public required Guid DesignerId { get; set; }
        [ForeignKey("DesignerId")]
        public virtual Designer? Designer { get; set; }
        [Required]
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal? RecycledPercentage { get; set; }
        public string? Gender { get; set; }
        [Required]
        [EnumDataType(typeof(DesignDraftType))]
        public DesignDraftType Type { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<DraftMaterial> DraftMaterials { get; set; } = new List<DraftMaterial>();
    }
    public enum DesignDraftType
    {
        Váy,
        Đầm,
        Áo,
        Quần
    }
}
