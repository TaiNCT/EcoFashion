using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("TypeSizes")]
    public class TypeSize
    {
        [ForeignKey("DesignTypeId")]
        public int DesignTypeId { get; set; }
        [Key]
        [Column(Order = 0)]
        public int DesignTypeIdPk { get; set; } 

        [ForeignKey("SizeId")]
        public int SizeId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int SizeIdPk { get; set; } 
      

        public float Meter { get; set; }
    }
}