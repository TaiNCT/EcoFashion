using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("RefundItems")]
    public class RefundItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RefundItemId { get; set; }
        public Guid TransactionId { get; set; }
        public Guid OrderId { get; set; }
        public Guid DesignId { get; set; }
        [ForeignKey(nameof(TransactionId))]
        public required PaymentTransaction PaymentTransaction { get; set; }
        [ForeignKey(nameof(OrderId))]
        public required Order Order { get; set; }
        [ForeignKey(nameof(DesignId))]
        public required Design Design { get; set; }
        public int? QuantityRefunded { get; set; }
        public decimal? RefundAmount { get; set; }
        public string? Reason { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}
