using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Entities
{
    [Table("Products")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        // Liên kết với design gốc
        public int DesignId { get; set; }
        [ForeignKey(nameof(DesignId))]
        public virtual Design Design { get; set; }

        // Liên kết với variant trong kế hoạch (nếu có)
        public int? VariantId { get; set; }
        [ForeignKey(nameof(VariantId))]
        public virtual DesignsVariant Variant { get; set; }

        // Thông tin bán hàng thực tế
        public int SizeId { get; set; }
        [ForeignKey(nameof(SizeId))]
        public virtual Size Size { get; set; }

        [MaxLength(50)]
        public string ColorCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string SKU { get; set; } // Mã sản phẩm duy nhất

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        // Care instructions (vd: giặt tay, không sấy)
        public string CareInstruction { get; set; }

        // Navigation tới các feature (reduce_waste, low_impact_dyes…)
        public virtual ProductFeature Feature { get; set; }
        public virtual ICollection<ProductInventory> Inventories { get; set; } = new List<ProductInventory>();
    }

}
