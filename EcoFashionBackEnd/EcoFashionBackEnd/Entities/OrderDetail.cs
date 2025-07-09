using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("OrderDetails")]
    public class OrderDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid OrderDetailId { get; set; }
        public Guid OrderId { get; set; }
        public Guid? DesignId { get; set; }
        public Guid? DesignerId { get; set; }
        public Guid? MaterialId { get; set; }
        public Guid? SupplierID { get; set; }
        [ForeignKey(nameof(OrderId))]
        public required Order Order { get; set; }
        [ForeignKey(nameof(DesignId))]
        public Design? Design { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public Designer? Designer { get; set; }
        [ForeignKey(nameof(MaterialId))]
        public Material? Material { get; set; }
        [ForeignKey(nameof(SupplierID))]
        public Supplier? Supplier { get; set; }
        public int? Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        [Required]
        [EnumDataType(typeof(OrderDetailType))]
        public OrderDetailType OrderDetailType { get; set; }
        [Required]
        [EnumDataType(typeof(OrderDetailStatus))]
        public OrderDetailStatus Status { get; set; } = OrderDetailStatus.Pending;
    }
    public enum OrderDetailType
    {
        Design,
        Material
    }
    public enum OrderDetailStatus
    {
        Pending,
        Shipping,
        Confirmed,
        Canceled
    }
}
