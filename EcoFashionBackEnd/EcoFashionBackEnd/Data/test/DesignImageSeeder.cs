using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public static class DesignImageSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.DesignImages.AnyAsync() ) return;

            var designs = await context.Designs.OrderBy(d => d.DesignId).ToListAsync();

            // 12 nhóm URL tương ứng 12 thiết kế
            var imageUrls = new List<List<string>>
        {
            new() { "https://example.com/img1a.jpg", "https://example.com/img1b.jpg", "https://example.com/img1c.jpg" },
            new() { "https://example.com/img2a.jpg", "https://example.com/img2b.jpg", "https://example.com/img2c.jpg" },
            new() { "https://example.com/img3a.jpg", "https://example.com/img3b.jpg", "https://example.com/img3c.jpg" },
            new() { "https://example.com/img4a.jpg", "https://example.com/img4b.jpg", "https://example.com/img4c.jpg" },
            new() { "https://example.com/img5a.jpg", "https://example.com/img5b.jpg", "https://example.com/img5c.jpg" },
            new() { "https://example.com/img6a.jpg", "https://example.com/img6b.jpg", "https://example.com/img6c.jpg" },
            new() { "https://example.com/img7a.jpg", "https://example.com/img7b.jpg", "https://example.com/img7c.jpg" },
            new() { "https://example.com/img8a.jpg", "https://example.com/img8b.jpg", "https://example.com/img8c.jpg" },
            new() { "https://example.com/img9a.jpg", "https://example.com/img9b.jpg", "https://example.com/img9c.jpg" },
            new() { "https://example.com/img10a.jpg", "https://example.com/img10b.jpg", "https://example.com/img10c.jpg" },
            new() { "https://example.com/img11a.jpg", "https://example.com/img11b.jpg", "https://example.com/img11c.jpg" },
            new() { "https://example.com/img12a.jpg", "https://example.com/img12b.jpg", "https://example.com/img12c.jpg" },
        };

            // Safety check
            if (designs.Count != imageUrls.Count)
                throw new Exception("Số lượng design và nhóm image URL không khớp.");

            var allImageEntities = new List<Image>();
            var allDesignImages = new List<DesignImage>();

            for (int i = 0; i < designs.Count; i++)
            {
                var design = designs[i];
                var urlsForThisDesign = imageUrls[i];

                foreach (var url in urlsForThisDesign)
                {
                    var image = new Image { ImageUrl = url };
                    allImageEntities.Add(image);

                    // Không có ImageId ở đây vì chưa save, nên phải xử lý sau
                    allDesignImages.Add(new DesignImage
                    {
                        Design = design,
                        Image = image
                    });
                }
            }

            // Save all images, EF sẽ gán ImageId tự động
            await context.Images.AddRangeAsync(allImageEntities);
            await context.SaveChangesAsync();

            // Save relation sau khi có ImageId
            await context.DesignImages.AddRangeAsync(allDesignImages);
            await context.SaveChangesAsync();
        }
    }


}
