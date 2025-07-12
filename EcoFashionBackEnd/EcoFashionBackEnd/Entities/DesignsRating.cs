using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Designs_Rating")]
    public class DesignsRating
    {
        [ForeignKey("DesignId")]
        public int DesignId { get; set; }
        public virtual Design Design { get; set; }

        public Guid CustomerId { get; set; }

        public float RatingScore { get; set; }

        [Key]
        [Column(Order = 0)]
        public int DesignIdPk { get; set; } // Composite Key Part 1

        [Key]
        [Column(Order = 1)]
        public Guid CustomerIdPk { get; set; } // Composite Key Part 2
    }
}