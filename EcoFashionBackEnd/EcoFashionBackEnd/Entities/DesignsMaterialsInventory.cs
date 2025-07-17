using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignerMaterialInventorys")]
    public class DesignMaterialInventory
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InventoryId { get; set; }

        public Guid DesignerId { get; set; } 
        [ForeignKey("DesignerId")]
        public virtual Designer Designer { get; set; }
        public int MaterialId { get; set; }
        // [ForeignKey("MaterialId")]
        // public virtual Material Material { get; set; }
        public string? Quantity { get; set; }
        public decimal Cost { get; set; }
        public DateTime LastBuyDate { get; set; }
        public string? Status { get; set; } // e.g., "In Stock", "Out of Stock"
    }
}
