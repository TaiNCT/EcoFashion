using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        [Required]
        public required int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
        [Required]
        public required string ShippingAddress { get; set; }
        [Required]
        public required decimal TotalPrice { get; set; }
        [Required]
        [EnumDataType(typeof(OrderStatus))]
        public OrderStatus Status { get; set; } = OrderStatus.pending;
        public DateTime OrderDate { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
    public enum OrderStatus
    {
        pending,
        processing,
        shipped,
        delivered,
        returned,
    }
}
