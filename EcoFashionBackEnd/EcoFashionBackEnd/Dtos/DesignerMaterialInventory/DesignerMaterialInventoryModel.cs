using EcoFashionBackEnd.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EcoFashionBackEnd.Dtos.Material;

namespace EcoFashionBackEnd.Dtos.DesignerMaterialInventory
{
    public class DesignerMaterialInventoryModel
    {
        public int DesignerMaterialInventoryId { get; set; }
        public Guid DesignerId { get; set; }
        public int MaterialId { get; set; }
        public int? Quantity { get; set; }
        public string Status { get; set; } = "out_of_stock";
        public DesignerModel? Designer { get; set; }
        public MaterialModel? Material { get; set; }
    }
}
