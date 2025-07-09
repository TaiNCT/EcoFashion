using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Designs")]
    public class Design
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DesignId { get; set; }
        public Guid DesignerId { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public required Designer Designer { get; set; }
        [Required]
        public required string DesignName { get; set; }
        public string? DesignDescription { get; set; }
        public double RecyledPercentage { get; set; }
        public string? CareInstructions { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool Gender {  get; set; }
        public int ProductScore { get; set; }
        [Required]
        [EnumDataType(typeof(DesignStatus))]
        public DesignStatus Status { get; set; } = DesignStatus.Pending;
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        public ICollection<DesignMaterial> DesignMaterials { get; set; } = new List<DesignMaterial>();
        public ICollection<DesignFeature> DesignFeatures { get; set; } = new List<DesignFeature>();
        public ICollection<DesignRating> DesignRatings { get; set; } = new List<DesignRating>();
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
    public enum DesignStatus
    {
        Pending,
        Approved,
        Rejected
    }
}
