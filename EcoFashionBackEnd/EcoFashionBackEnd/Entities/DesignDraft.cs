using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignDrafts")]
    public class DesignDraft
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DraftId { get; set; }
        public Guid DesignerId { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public required Designer Designer { get; set; }
        [Required]
        [StringLength(100)]
        public required string DraftName { get; set; }
        public string? DraftDescription { get; set; }
        public double? RecycledPercentage { get; set; }
        public bool Gender { get; set; }
        [Required]
        [EnumDataType(typeof(DraftType))]
        public DraftType Type { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        public ICollection<DesignVarient> DesignVarients { get; set; } = new List<DesignVarient>();
        public ICollection<DesignImage> DesignImages { get; set; } = new List<DesignImage>();
        public ICollection<DraftMaterial> DraftMaterials { get; set; } = new List<DraftMaterial>();
    }
    public enum DraftType
    {
        Váy,
        Đầm,
        Áo,
        Quần
    }
}
