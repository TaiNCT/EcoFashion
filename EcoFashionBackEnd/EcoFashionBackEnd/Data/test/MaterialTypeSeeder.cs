using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Seeders
{
    public static class MaterialTypeSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.MaterialTypes.AnyAsync()) return;

            var materialTypes = new List<MaterialType>
            {
                new MaterialType { TypeName = "Recycled Polyester" },
                new MaterialType { TypeName = "Recycled Cotton" },
                new MaterialType { TypeName = "Recycled Wool" },
                new MaterialType { TypeName = "Recycled Nylon" },
                new MaterialType { TypeName = "Recycled Denim" },
                new MaterialType { TypeName = "Organic Cotton" },
                new MaterialType { TypeName = "Recycled Hemp" },
                new MaterialType { TypeName = "RPET Plastic" }
            };

            await context.MaterialTypes.AddRangeAsync(materialTypes);
            await context.SaveChangesAsync();
        }
    }
}
