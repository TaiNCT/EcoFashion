using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public static class MaterialSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.Materials.AnyAsync()) return;

            var supplier = await context.Suppliers.FirstOrDefaultAsync(s => s.Email == "supplier1@example.com");
            if (supplier == null) throw new Exception("Supplier not found");

            var materials = new List<Material>
        {
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 1,
                Name = "Organic Cotton",
                Description = "Natural cotton fabric, sustainable and soft.",
                RecycledPercentage = 90,
                QuantityAvailable = 1000,
                PricePerUnit = 4000,
                DocumentationUrl = "https://docs.organiccotton.com/quality-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 2,
                Name = "Recycled Hemp",
                Description = "Durable and eco-friendly recycled hemp.",
                RecycledPercentage = 80,
                QuantityAvailable = 500,
                PricePerUnit = 6500,
                DocumentationUrl = "https://docs.recycledhemp.com/quality-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 3,
                Name = "RPET Plastic",
                Description = "Recycled PET plastic used in textiles.",
                RecycledPercentage = 95,
                QuantityAvailable = 800,
                PricePerUnit = 50000,
                DocumentationUrl = "https://docs.rpetplastic.com/quality-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 1,
                Name = "Material 4",
                Description = "Biodegradable natural bamboo fibers.",
                RecycledPercentage = 60,
                QuantityAvailable = 700,
                PricePerUnit = 4500,
                DocumentationUrl = "https://docs.material4.com/bamboo-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 2,
                Name = "Material 5",
                Description = "Tencel fabric from sustainable eucalyptus pulp.",
                RecycledPercentage = 70,
                QuantityAvailable = 650,
                PricePerUnit = 6000,
                DocumentationUrl = "https://docs.material5.com/tencel-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 3,
                Name = "Material 6",
                Description = "Post-consumer wool blend with high durability.",
                RecycledPercentage = 55,
                QuantityAvailable = 900,
                PricePerUnit = 7500,
                DocumentationUrl = "https://docs.material6.com/wool-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 1,
                Name = "Material 7",
                Description = "Recycled denim from pre-loved jeans.",
                RecycledPercentage = 85,
                QuantityAvailable = 600,
                PricePerUnit = 5500,
                DocumentationUrl = "https://docs.material7.com/denim-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 2,
                Name = "Material 8",
                Description = "Regenerated nylon made from fishing nets.",
                RecycledPercentage = 88,
                QuantityAvailable = 300,
                PricePerUnit = 8500,
                DocumentationUrl = "https://docs.material8.com/nylon-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 3,
                Name = "Material 9",
                Description = "Cork textile made from waste bark.",
                RecycledPercentage = 75,
                QuantityAvailable = 400,
                PricePerUnit = 9500,
                DocumentationUrl = "https://docs.material9.com/cork-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 1,
                Name = "Material 10",
                Description = "Silk alternative made from orange peels.",
                RecycledPercentage = 65,
                QuantityAvailable = 480,
                PricePerUnit = 9700,
                DocumentationUrl = "https://docs.material10.com/orange-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 2,
                Name = "Material 11",
                Description = "Upcycled leather from scrap production.",
                RecycledPercentage = 82,
                QuantityAvailable = 520,
                PricePerUnit = 12000,
                DocumentationUrl = "https://docs.material11.com/leather-certification.pdf"
            },
            new Material
            {
                SupplierId = supplier.SupplierId,
                TypeId = 3,
                Name = "Material 12",
                Description = "Piñatex - pineapple fiber-based textile.",
                RecycledPercentage = 93,
                QuantityAvailable = 350,
                PricePerUnit = 10500,
                DocumentationUrl = "https://docs.material12.com/pinatex-certification.pdf"
            }
        };

            await context.Materials.AddRangeAsync(materials);
            await context.SaveChangesAsync();
        }
    }



}