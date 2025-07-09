using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignerLikes")]
    public class DesignerLike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid LikeId { get; set; }
        public Guid DesignerId { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public required Designer Designer { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}
