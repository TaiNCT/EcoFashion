using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Favorites")]
    public class Favorite
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid FavoriteId { get; set; }
        public int UserId { get; set; }
        public Guid? DesignId { get; set; }
        public Guid? DesignerId { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
        [ForeignKey(nameof(DesignId))]
        public Design? Design { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public Designer? Designer { get; set; }
    }
}
