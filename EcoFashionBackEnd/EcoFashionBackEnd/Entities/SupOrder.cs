using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("SupOrders")]
    public class SupOrder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SupOrderId { get; set; }
        public Guid OrderId { get; set; }
        public Guid? DesignerId { get; set; }
        public Guid? SupplierId { get; set; }
        [ForeignKey(nameof(OrderId))]
        public required Order Order { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public Designer? Designer { get; set; }
        [ForeignKey(nameof(SupplierId))]
        public Supplier? Supplier { get; set; }
        public double? TotalPrice { get; set; }
        [Required]
        [EnumDataType(typeof(SupOrderStatus))]
        public SupOrderStatus SupOrderStatus { get; set; } = SupOrderStatus.Pending;
    }
    public enum SupOrderStatus
    {
        Pending,
        Shipping,
        Confirmed,
        Canceled
    }
}
