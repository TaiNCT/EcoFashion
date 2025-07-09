using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignRatings")]
    public class DesignRating
    {
        public Guid DesignId { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(DesignRating))]
        public required Design Design { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
        [Required]
        public required double RatingScore { get; set; }
    }
}
