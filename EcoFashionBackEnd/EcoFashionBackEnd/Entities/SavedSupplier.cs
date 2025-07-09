using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("SavedSuppliers")]
    public class SavedSupplier
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SavedSupplierId { get; set; }
        public Guid DesignerId { get; set; }
        public Guid SupplierId { get; set; }
        [ForeignKey(nameof(DesignerId))]
        public Designer Designer { get; set; } = null!;
        [ForeignKey(nameof(SupplierId))]
        public Supplier Supplier { get; set; } = null!;
    }
}
