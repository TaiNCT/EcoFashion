using EcoFashionBackEnd.Dtos.Material;

namespace EcoFashionBackEnd.Dtos.DesignerMaterialInventory
{
    public class DesignerMaterialInventoryRequest
    {
        public int MaterialId { get; set; }
        public int? Quantity { get; set; }
    }
}
