using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Reviews")]
    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ReviewId { get; set; }
        public int UserId { get; set; }
        public Guid DesignId { get; set; }
        public Guid DesignerId { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
        [ForeignKey(nameof(DesignId))]
        public required Design Design { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public required Designer Designer { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}
