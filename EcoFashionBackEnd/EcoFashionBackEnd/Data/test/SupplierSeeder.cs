using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace EcoFashionBackEnd.Data.test
{
    public static class SupplierSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.Suppliers.AnyAsync()) return;

            var supplierUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "supplier@example.com");
            if (supplierUser == null) throw new Exception("Supplier user not found");

            var now = DateTime.UtcNow;

            var supplier = new Supplier
            {
                UserId = supplierUser.UserId,
                SupplierName = "Supplier One",
                Bio = "Chuyên cung cấp chất liệu thời trang thân thiện với môi trường.",
                AvatarUrl = "https://plus.unsplash.com/premium_photo-1675179040377-24f37aeb2146?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                BannerUrl = "https://plus.unsplash.com/premium_photo-1675179040377-24f37aeb2146?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                PortfolioUrl = "https://supplier1.com",
                PortfolioFiles = JsonSerializer.Serialize(new[]
                {
                "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400"
            }),
                Certificates = JsonSerializer.Serialize(new[]
                {
                "Green Supplier Certificate"
            }),
                Email = "supplier1@example.com",
                PhoneNumber = "0987654321",
                Address = "456 Green Lane, HCMC",
                TaxNumber = "TAXSUP123",
                IdentificationNumber = "SUPID987654321",
                //IdentificationPictureFront = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
                //IdentificationPictureBack = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
                SpecializationUrl = "https://specialization.supplier1.com",
                Status = "active",
                CreatedAt = now
            };

            await context.Suppliers.AddAsync(supplier);
            await context.SaveChangesAsync();
        }
    }

}