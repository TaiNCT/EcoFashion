using EcoFashionBackEnd.Entities.EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public static class MaterialImageSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.MaterialImages.AnyAsync()) return;

            var materials = await context.Materials.OrderBy(m => m.MaterialId).ToListAsync();
            var materialImages = new List<MaterialImage>();

            var imageUrlsByMaterial = new Dictionary<string, List<string>>
            {
                ["Organic Cotton"] = new List<string>
            {
                "https://images.unsplash.com/photo-1581089781785-603411fa81f3",
                "https://images.unsplash.com/photo-1587303431045-9c3c3f0b2905",
                "https://images.unsplash.com/photo-1620401802050-d6de0f496cbb"
            },
                ["Recycled Hemp"] = new List<string>
            {
                "https://images.unsplash.com/photo-1603251577542-3c49eec2a4a5",
                "https://images.unsplash.com/photo-1556485688-c2bfa916bffa",
                "https://images.unsplash.com/photo-1620077300620-c648cfb1b7f3"
            },
                ["RPET Plastic"] = new List<string>
            {
                "https://images.unsplash.com/photo-1610381071673-c6f163b33b38",
                "https://images.unsplash.com/photo-1581090700227-4c9a4c800b86",
                "https://images.unsplash.com/photo-1610381072321-0f5479a1a659"
            },
                ["Material 4"] = new List<string>
            {
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
            },
                ["Material 5"] = new List<string>
            {
                "https://images.unsplash.com/photo-1520975918108-6c03b8f7db4b",
                "https://images.unsplash.com/photo-1532364151241-68b8e5e8fc0f",
                "https://images.unsplash.com/photo-1562751362-3087d3dd7484"
            },
                ["Material 6"] = new List<string>
            {
                "https://images.unsplash.com/photo-1583394838336-acd977736f90",
                "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
                "https://images.unsplash.com/photo-1549893079-0e0f68e518d2"
            },
                ["Material 7"] = new List<string>
            {
                "https://images.unsplash.com/photo-1609947010982-1f4ef28a38db",
                "https://images.unsplash.com/photo-1610449862267-72c13c7ff7c3",
                "https://images.unsplash.com/photo-1583324113626-70df0f4deaab"
            },
                ["Material 8"] = new List<string>
            {
                "https://images.unsplash.com/photo-1589927986089-35812388d1a7",
                "https://images.unsplash.com/photo-1589820296154-62d7dcf5d292",
                "https://images.unsplash.com/photo-1618477462609-ec7d17b3835e"
            },
                ["Material 9"] = new List<string>
            {
                "https://images.unsplash.com/photo-1618221730412-cc2216c2d3fa",
                "https://images.unsplash.com/photo-1601581433044-b5e859effbd0",
                "https://images.unsplash.com/photo-1572249866521-c1bb6ac1d5b3"
            },
                ["Material 10"] = new List<string>
            {
                "https://images.unsplash.com/photo-1616443832548-bfbde8c6e5c2",
                "https://images.unsplash.com/photo-1582056615356-968628f8f351",
                "https://images.unsplash.com/photo-1618220179422-1903127d14ec"
            },
                ["Material 11"] = new List<string>
            {
                "https://images.unsplash.com/photo-1582719478185-6d20f80f51ee",
                "https://images.unsplash.com/photo-1622536662233-35ae8e2f111d",
                "https://images.unsplash.com/photo-1591533162562-e652ff574153"
            },
                ["Material 12"] = new List<string>
            {
                "https://images.unsplash.com/photo-1612874753802-4286cf443ee8",
                "https://images.unsplash.com/photo-1557970877-3d648fd94b92",
                "https://images.unsplash.com/photo-1592009309600-bcaefb4c881c"
            }
            };

            foreach (var material in materials)
            {
                var key = material.Name;
                if (!imageUrlsByMaterial.TryGetValue(key, out var urls))
                {
                    key = $"Material {material.MaterialId}";
                    if (!imageUrlsByMaterial.TryGetValue(key, out urls))
                        continue; 
                }

                foreach (var url in urls)
                {
                    var image = new Image { ImageUrl = url };
                    await context.Images.AddAsync(image);
                    await context.SaveChangesAsync(); 

                    materialImages.Add(new MaterialImage
                    {
                        MaterialId = material.MaterialId,
                        ImageId = image.ImageId
                    });
                }
            }

            await context.MaterialImages.AddRangeAsync(materialImages);
            await context.SaveChangesAsync();
        }
    }

}
