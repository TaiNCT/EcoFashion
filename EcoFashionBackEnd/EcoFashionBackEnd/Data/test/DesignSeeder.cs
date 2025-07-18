using EcoFashionBackEnd.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Cms;

namespace EcoFashionBackEnd.Data.test
{
    public static class DesignSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {

            var designNames = new[]
            {
            "Eco Hoodie", "Organic T-Shirt", "Sustainable Jeans", "Linen Blouse",
            "Recycled Jacket", "Eco Dress", "Vegan Leather Bag", "Bamboo Shirt",
            "RPET Shorts", "Hemp Hat", "Green Socks", "Bio Cotton Skirt"
        };

            if (await context.Designs.AnyAsync()) return;

            var designer = await context.Designers
                .FirstOrDefaultAsync(d => d.User.Email == "designer@example.com");

            if (designer == null) throw new Exception("Designer not found");

            var designTypeIds = await context.DesignsTypes.Select(dt => dt.DesignTypeId).ToListAsync();
            if (designTypeIds.Count == 0) throw new Exception("No DesignTypes available.");

            var random = new Random();
            var designs = new List<Design>();

            foreach (var name in designNames)
            {
                designs.Add(new Design
                {
                    Name = name,
                    Description = $"This is a sustainable design: {name}",
                    DesignerId = designer.DesignerId,
                    CreatedAt = DateTime.UtcNow,
                    RecycledPercentage = (float)(random.NextDouble() * 60 + 30), 
                    CareInstructions = "Machine wash cold. Do not bleach. Tumble dry low.",
                    Price = (decimal)(random.NextDouble() * 170000 + 30000), 
                    ProductScore = random.Next(50, 100),
                    Status = random.Next(2) == 0 ? "Published" : "Draft",
                    DesignTypeId = designTypeIds[random.Next(designTypeIds.Count)]
                });
            }
            //phần này cho khi dùng 3 designer  
            //if (await context.Designs.AnyAsync()) return;

            //var designers = await context.Designers
            //    .OrderBy(d => d.DesignerId)
            //    .Take(3)
            //    .ToListAsync();

            //if (designers.Count < 3)
            //    throw new Exception("Need at least 3 designers to seed with this method.");
            //var designs = new List<Design>();
            //int designerIndex = 0;

            //for (int i = 0; i < 12; i++)
            //{
            //    designs.Add(new Design
            //    {   Name = name,
            //        Description = $"This is a sustainable design: {name}",
            //        DesignerId = designer.DesignerId,
            //        CreatedAt = DateTime.UtcNow,
            //        RecycledPercentage = (float)(random.NextDouble() * 60 + 30), // 30% - 90%
            //        CareInstructions = "Machine wash cold. Do not bleach. Tumble dry low.",
            //        Price = (decimal)(random.NextDouble() * 170 + 30), // 30 - 200
            //        ProductScore = random.Next(50, 100),
            //        Status = random.Next(2) == 0 ? "Published" : "Draft",
            //        DesignTypeId = designTypeIds[random.Next(designTypeIds.Count)]
            //    });

            //    // Mỗi 4 thiết kế thì đổi designer
            //    if ((i + 1) % 4 == 0) designerIndex++;
            //}

            await context.Designs.AddRangeAsync(designs);
            await context.SaveChangesAsync();
        }
    }



}