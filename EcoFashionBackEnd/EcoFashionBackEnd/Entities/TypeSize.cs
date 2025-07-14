using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Type_Size")]
    public class TypeSize
    {
        [ForeignKey("DesignTypeId")]
        public int DesignTypeId { get; set; }
        [Key]
        [Column(Order = 0)]
        public int DesignTypeIdPk { get; set; } // Composite Key Part 1
        // public virtual DesignType DesignType { get; set; } // Có thể gây vòng lặp cascade nếu không cấu hình cẩn thận

        [ForeignKey("SizeId")]
        public int SizeId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int SizeIdPk { get; set; } // Composite Key Part 2
        // public virtual DesignsSize DesignsSize { get; set; } // Có thể gây vòng lặp cascade nếu không cấu hình cẩn thận

        public float Meter { get; set; }
    }
}