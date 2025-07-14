using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Design_Type")]
    public class DesignType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DesignTypeId { get; set; }

        public string? DesignName { get; set; }

        public int SizeId { get; set; }
        [ForeignKey("SizeId")]
        public virtual DesignsSize DesignsSize { get; set; }

        public float Meter { get; set; }
    }
}