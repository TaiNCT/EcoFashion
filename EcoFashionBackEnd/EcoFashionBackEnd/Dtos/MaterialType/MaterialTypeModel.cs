using EcoFashionBackEnd.Entities;

namespace EcoFashionBackEnd.Dtos.MaterialType
{
    public class MaterialTypeModel
    {
        public int TypeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public ICollection<Material> Materials { get; set; } = new List<Material>();
    }
}
