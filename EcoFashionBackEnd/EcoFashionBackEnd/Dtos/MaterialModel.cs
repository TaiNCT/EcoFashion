using EcoFashionBackEnd.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Dtos
{
    public class MaterialModel
    {
        public int MaterialId { get; set; }
        public int TypeId { get; set; }
        public Guid SupplierId { get; set; }
        public required string MaterialName { get; set; }
        public string? MaterialDescription { get; set; }
        public double? SustainabilityScore { get; set; }
        public double? RecycledPercentage { get; set; }
        public int? QuantityAvailable { get; set; }
        public decimal? PricePerUnit { get; set; }
        public string? DocumentationUrl { get; set; }
    }
}
