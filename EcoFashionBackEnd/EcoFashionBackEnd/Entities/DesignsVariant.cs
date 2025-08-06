using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignsVariants")]
    public class DesignsVariant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int SizeId { get; set; }
        [ForeignKey("SizeId")]
        public virtual DesignsSize DesignsSize { get; set; }

        public int DesignId { get; set; }
        [ForeignKey("DesignId")]
        public virtual Design Design { get; set; }

        public string  Color { get; set; }


        public int Quantity { get; set; }
      
    }
}