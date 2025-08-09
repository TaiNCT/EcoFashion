using EcoFashionBackEnd.Entities;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using System;

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
                .Include(d => d.User) // đảm bảo lấy được User.Email
                .FirstOrDefaultAsync(d => d.User.Email == "designer@example.com");

            if (designer == null) throw new Exception("Designer not found");

            var designs = new List<Design>();
            var random = new Random();
            int min = 500_000;
            int max = 1_000_000;

            for (int i = 0; i < designNames.Length; i++)
            {
                var design = new Design
                {
                    Name = designNames[i],
                    Description = $"This is a sustainable design: {designNames[i]}",
                    DesignerId = designer.DesignerId,
                    RecycledPercentage = 100 - i, // giảm dần cho đa dạng
                    SalePrice = random.Next(min, max + 1),
                    ProductScore = 5,
                    CreatedAt = DateTime.UtcNow
                };

                designs.Add(design);
            }

            await context.Designs.AddRangeAsync(designs);
            await context.SaveChangesAsync();
        }
    }

}
