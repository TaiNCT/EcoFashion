using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Entities
{
    [Table("Designs")]
    public class Design
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DesignId { get; set; }

        [ForeignKey("DesignerProfile")]
        public Guid DesignerId { get; set; }
        public virtual Designer DesignerProfile { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public float RecycledPercentage { get; set; }
        public string? CareInstructions { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool Gender { get; set; }
        public int ProductScore { get; set; }
        public string? Status { get; set; } // ENUM('pending', 'approved', 'rejected') - bạn có thể tạo một enum DesignStatus riêng
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<DesignsVarient> DesignsVarients { get; set; }
        public virtual DesignsFeature DesignsFeature { get; set; }
        public virtual ICollection<DesignsMaterial> DesignsMaterials { get; set; }
        public virtual ICollection<DesignsRating> DesignsRatings { get; set; }
        public virtual ICollection<DesignImage> DesignImages { get; set; }

        // public virtual ICollection<Designs_Color> DesignsColors { get; set; } // Bạn có thể bỏ comment nếu cần
        // public virtual ICollection<Designs_Size> DesignsSizes { get; set; }   // Bạn có thể bỏ comment nếu cần
        // public virtual Design_Type DesignType { get; set; }   
    }
}
