using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    
    //[Table("PaymentTransactions")]
    public class PaymentTransaction
    {
        /*
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TransactionId { get; set; }
        public Guid OrderId { get; set; }
        public Guid MaterialOrderId { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey(nameof(OrderId))]
        public required Order Order { get; set; }
        [ForeignKey(nameof(MaterialOrderId))]
        public required Order MaterialOrder { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
        public decimal? Amount { get; set; }
        [Required]
        [EnumDataType(typeof(PaymentTransactionType))]
        public PaymentTransactionType TransactionType { get; set; }
        [Required]
        [EnumDataType(typeof(PaymentTransactionStatus))]
        public PaymentTransactionStatus Status { get; set; } = PaymentTransactionStatus.Pending;
        [Required]
        [EnumDataType(typeof(PaymentTransactionOrderType))]
        public PaymentTransactionOrderType OrderType { get;set; }
        [Required]
        [EnumDataType(typeof(PaymentTransactionMethod))]
        public PaymentTransactionMethod Method { get; set; }
    */
    }
    public enum PaymentTransactionType
    {
        Payment,
        Refund,
        Payout
    }
    public enum PaymentTransactionStatus
    {
        Pending,
        Completed,
        Failed
    }
    public enum PaymentTransactionOrderType
    {
        Product,
        Material
    }
    public enum PaymentTransactionMethod
    {
        Credit_Card,
        Paypal,
        Bank_Transfer
    }
}
