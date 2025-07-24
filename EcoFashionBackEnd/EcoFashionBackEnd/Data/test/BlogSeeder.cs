using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public class BlogSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.Blogs.AnyAsync()) return;
            var supplier = await context.Suppliers.FirstOrDefaultAsync(s => s.Email == "supplier1@example.com");
            if (supplier == null) throw new Exception("Supplier not found");
            var blogs = new List<Blog>
            {
                new Blog
                {
                    SupplierId = supplier.SupplierId,
                    MaterialId = 1, // Assuming MaterialId 1 exists
                    Title = "Sustainable Fashion Trends 2024",
                    Content = "Explore the latest trends in sustainable fashion for 2024, including eco-friendly materials and ethical production practices."
                },
                new Blog
                {
                    SupplierId = supplier.SupplierId,
                    MaterialId = 2,
                    Title = "The Impact of Fast Fashion",
                    Content = "An in-depth look at how fast fashion affects the environment and society, and what we can do to combat it."
                },
                new Blog
                {
                    SupplierId = supplier.SupplierId,
                    MaterialId = 3,
                    Title = "How to Build a Sustainable Wardrobe",
                    Content = "Tips and tricks for creating a sustainable wardrobe that minimizes waste and maximizes style."
                }
            };

            await context.Blogs.AddRangeAsync(blogs);
            await context.SaveChangesAsync();
        }
    }
}
