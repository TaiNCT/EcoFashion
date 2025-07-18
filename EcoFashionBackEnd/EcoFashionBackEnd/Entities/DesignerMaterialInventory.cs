using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Designer_Material_Inventory")]
    public class DesignerMaterialInventory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DesignerMaterialInventoryId { get; set; }
        public required Guid DesignerId { get; set; }
        [ForeignKey("DesignerId")]
        public virtual Designer? Designer { get; set; }
        public required int MaterialId { get; set; }
        [ForeignKey("MaterialId")]
        public virtual Material? Material { get; set; }
        public int? Quantity { get; set; }
        [EnumDataType(typeof(InventoryStatus))]
        [Required]
        public InventoryStatus Status { get; set; }
    }
    public enum InventoryStatus
    {
        in_stock,
        out_of_stock,
        low_stock
    }
}
