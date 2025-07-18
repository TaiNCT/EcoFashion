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
        public int ProductScore { get; set; }
        public string? Status { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("DesignsTypes")]
        public int? DesignTypeId { get; set; }

        public virtual DesignsType DesignTypes { get; set; }
        public virtual ICollection<DesignsVariant> DesignsVariants { get; set; }
        public virtual ICollection<DesignsMaterial> DesignsMaterials { get; set; }
        public virtual ICollection<DesignsRating> DesignsRatings { get; set; }
        public virtual ICollection<DesignImage> DesignImages { get; set; }
         public virtual ICollection<DesignsColor> DesignsColors { get; set; } 
         public virtual ICollection<DesignsSize> DesignsSizes { get; set; }   
         
    }
}
