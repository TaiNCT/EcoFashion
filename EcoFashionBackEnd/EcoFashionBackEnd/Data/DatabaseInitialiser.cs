// DatabaseInitialiser.cs – version đầy đủ với dữ liệu mẫu cho tất cả vai trò + 12 Designs + 12 Materials

using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Helpers;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data
{
    public interface IDataaseInitialiser
    {
        Task InitialiseAsync();
        Task SeedAsync();
        Task TrySeedAsync();
    }

    public class DatabaseInitialiser : IDataaseInitialiser
    {
        private readonly AppDbContext _context;

        public DatabaseInitialiser(AppDbContext context)
        {
            _context = context;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                await _context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Migration error: " + ex.Message);
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Seed error: " + ex.Message);
                throw;
            }
        }

        public async Task TrySeedAsync()
        {
            if (_context.UserRoles.Any() || _context.Users.Any() || _context.DesignsColors.Any()) return;

            var now = DateTime.UtcNow;

            // User Roles
            var adminRole = new UserRole { RoleName = "admin", Description = "System administrator" };
            var designerRole = new UserRole { RoleName = "designer", Description = "Fashion designer" };
            var supplierRole = new UserRole { RoleName = "supplier", Description = "Material supplier" };
            var customerRole = new UserRole { RoleName = "customer", Description = "Customer user" };
            await _context.UserRoles.AddRangeAsync(adminRole, designerRole, supplierRole, customerRole);
            await _context.SaveChangesAsync();

            // Users
            var users = new List<User>
            {
                new User { Email = "admin@example.com", PasswordHash = SecurityUtil.Hash("admin"), FullName = "Admin User", RoleId = adminRole.RoleId, Status = UserStatus.Active },
                new User { Email = "designer@example.com", PasswordHash = SecurityUtil.Hash("designer"), FullName = "Designer One", RoleId = designerRole.RoleId, Status = UserStatus.Active },
                new User { Email = "supplier@example.com", PasswordHash = SecurityUtil.Hash("supplier"), FullName = "Supplier One", RoleId = supplierRole.RoleId, Status = UserStatus.Active },
                new User { Email = "customer@example.com", PasswordHash = SecurityUtil.Hash("customer"), FullName = "Customer One", RoleId = customerRole.RoleId, Status = UserStatus.Active }
            };
            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();

            var designerUser = users.First(u => u.Email == "designer@example.com");
            var supplierUser = users.First(u => u.Email == "supplier@example.com");
            var customerUser = users.First(u => u.Email == "customer@example.com");

            // Designer
            var designer = new Designer
            {
                UserId = designerUser.UserId,
                DesignerName = "Designer One",
                Bio = "Nhà thiết kế đam mê thời trang bền vững và nghệ thuật tự nhiên.",
                AvatarUrl = "https://images.pexels.com/photos/32965438/pexels-photo-32965438.jpeg",
                BannerUrl = "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                PortfolioUrl = "https://portfolio.designer1.com",
                PortfolioFiles = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" }),
                Certificates = JsonSerializer.Serialize(new[] { "Eco Fashion Award 2023" }),
                Email = "designer1@example.com",
                PhoneNumber = "0123456789",
                Address = "123 Eco Street, HCMC",
                TaxNumber = "TAX123456",
                IdentificationNumber = "ID123456789",
                //IdentificationPictureFront = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
                //IdentificationPictureBack = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
                SpecializationUrl = "https://specialization.designer1.com",
                Status = "active",
                CreatedAt = now
            };
            await _context.Designers.AddAsync(designer);
            await _context.SaveChangesAsync();

            // Supplier
            var supplier = new Supplier
            {
                UserId = supplierUser.UserId,
                SupplierName = "Supplier One",
                Bio = "Chuyên cung cấp chất liệu thời trang thân thiện với môi trường.",
                AvatarUrl = "https://plus.unsplash.com/premium_photo-1675179040377-24f37aeb2146?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                BannerUrl = "https://plus.unsplash.com/premium_photo-1675179040377-24f37aeb2146?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                PortfolioUrl = "https://supplier1.com",
                PortfolioFiles = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400" }),
                Certificates = JsonSerializer.Serialize(new[] { "Green Supplier Certificate" }),
                Email = "supplier1@example.com",
                PhoneNumber = "0987654321",
                Address = "456 Green Lane, HCMC",
                TaxNumber = "TAXSUP123",
                IdentificationNumber = "SUPID987654321",
                //IdentificationPictureFront = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
                //IdentificationPictureBack = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
                SpecializationUrl = "https://specialization.supplier1.com",
                Status = "active",
                CreatedAt = DateTime.UtcNow
            };
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            // Seed DesignsColor
            var colors = new List<DesignsColor>
            {
                new DesignsColor { ColorName = "Đen", ColorCode = "#000000" },
                new DesignsColor { ColorName = "Trắng", ColorCode = "#ffffff" },
                new DesignsColor { ColorName = "Xanh lá", ColorCode = "#2ecc40" },
                new DesignsColor { ColorName = "Nâu", ColorCode = "#8B4513" },
                new DesignsColor { ColorName = "Xanh Navy", ColorCode = "#001f3f" },
                new DesignsColor { ColorName = "Xanh Rêu", ColorCode = "#556b2f" },
                new DesignsColor { ColorName = "Xám", ColorCode = "#808080" },
                new DesignsColor { ColorName = "Be", ColorCode = "#f5f5dc" },
                new DesignsColor { ColorName = "Tím", ColorCode = "#800080" },
                new DesignsColor { ColorName = "Hồng", ColorCode = "#ff69b4" },
                new DesignsColor { ColorName = "Hồng Nhạt", ColorCode = "#ffe4e1" },
                new DesignsColor { ColorName = "Kem", ColorCode = "#fdf5e6" },
                new DesignsColor { ColorName = "Xanh Nhạt", ColorCode = "#add8e6" },
                new DesignsColor { ColorName = "Xanh Dương", ColorCode = "#0074D9" },
                new DesignsColor { ColorName = "Xanh Đậm", ColorCode = "#003366" },
            };
            await _context.DesignsColors.AddRangeAsync(colors);
            await _context.SaveChangesAsync();

            // Seed DesignsSize
            var sizes = new List<DesignsSize>
            {
                new DesignsSize { SizeName = "S", SizeDescription = "Small" },
                new DesignsSize { SizeName = "M", SizeDescription = "Medium" },
                new DesignsSize { SizeName = "L", SizeDescription = "Large" }
            };
            await _context.DesignsSizes.AddRangeAsync(sizes);
            await _context.SaveChangesAsync();

            // Seed DesignType
            var designTypes = new List<DesignsType>
            {
                 new DesignsType { DesignName = "Áo" },
                 new DesignsType { DesignName = "Quần" },
                 new DesignsType { DesignName = "Đầm" },
                 new DesignsType { DesignName = "Váy" },
            };
            await _context.DesignsTypes.AddRangeAsync(designTypes);
            await _context.SaveChangesAsync();

            // Seed Sustainability Criteria
            var sustainabilityCriterias = new List<SustainabilityCriteria> {
                new SustainabilityCriteria
                {
                    Name = "carbon_footprint",
                    Description = "Lower carbon footprint than conventional methods",
                    Unit = "kg"
                },
                new SustainabilityCriteria
                {
                    Name = "water_usage",
                    Description = "Compared to conventional production",
                    Unit = "liters"
                },
                new SustainabilityCriteria
                {
                    Name = "waste_diverted",
                    Description = "Textile waste kept out of landfills",
                    Unit = "kg"
                }
            };
            await _context.SustainabilityCriteria.AddRangeAsync(sustainabilityCriterias);
            await _context.SaveChangesAsync();

            // Seed Material Type
            var materialTypes = new List<MaterialType> {
                new MaterialType { TypeName = "Recycled Polyester" },
                new MaterialType { TypeName = "Recycled Cotton" },
                new MaterialType { TypeName = "Recycled Wool" },
                new MaterialType {  TypeName = "Recycled Nylon" },
                new MaterialType {  TypeName = "Recycled Denim" }};
            await _context.MaterialTypes.AddRangeAsync(materialTypes);
            await _context.SaveChangesAsync();

            // Seed Material
            var materials = new List<Material> {
                new Material
                {
                    SupplierId = supplier.SupplierId,
                    TypeId = 1,
                    Name = "Organic Cotton",
                    Description = "Natural cotton fabric",
                    SustainabilityScore = 8.2f,
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
                    Description = "Durable recycled hemp",
                    SustainabilityScore = 7.5f,
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
                    Description = "Recycled PET plastic",
                    SustainabilityScore = 8.8f,
                    RecycledPercentage = 95,
                    QuantityAvailable = 800,
                    PricePerUnit = 50000,
                    DocumentationUrl = "https://docs.rpetplastic.com/quality-certification.pdf"
                }

            };
            await _context.Materials.AddRangeAsync(materials);
            await _context.SaveChangesAsync();

            // Seed Material Sustainability
            var materialSustainabilities = new List<MaterialSustainability> {
                new MaterialSustainability { MaterialId = materials[0].MaterialId, CriterionId = 1, Value = 1.2f },
                new MaterialSustainability { MaterialId = materials[0].MaterialId, CriterionId = 2, Value = 2.3f },
                new MaterialSustainability { MaterialId = materials[0].MaterialId, CriterionId = 3, Value = 1.5f},
                new MaterialSustainability { MaterialId = materials[1].MaterialId, CriterionId = 1, Value = 2.2f },
                new MaterialSustainability { MaterialId = materials[1].MaterialId, CriterionId = 2, Value = 1.8f },
                new MaterialSustainability { MaterialId = materials[1].MaterialId, CriterionId = 3, Value = 2.9f },
                new MaterialSustainability { MaterialId = materials[2].MaterialId, CriterionId = 1, Value = 2.1f },
                new MaterialSustainability { MaterialId = materials[2].MaterialId, CriterionId = 2, Value = 3.2f },
                new MaterialSustainability { MaterialId = materials[2].MaterialId, CriterionId = 3, Value = 1.1f }
            };
            await _context.MaterialSustainabilityMetrics.AddRangeAsync(materialSustainabilities);
            await _context.SaveChangesAsync();

            //// Seed a Design
            //var design = new Design
            //{
            //    DesignerId = designer.DesignerId,
            //    Name = "Sample T-Shirt",
            //    Description = "A basic sample t-shirt.",
            //    RecycledPercentage = 50.0f,
            //    CareInstructions = "Machine wash cold.",
            //    Price = 25.99m,
            //    Quantity = 100,
            //    ProductScore = 4,
            //    Status = "approved",
            //    CreatedAt = DateTime.UtcNow
            //};
            //await _context.Designs.AddAsync(design);
            //await _context.SaveChangesAsync();

            // Seed Images
            //var images = new List<Image>
            //{
            //    new Image { ImageUrl = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400" },
            //    new Image { ImageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400" }
            //};
            //await _context.Images.AddRangeAsync(images);
            //await _context.SaveChangesAsync();

            // Seed DesignImages 
            //var designImages = new List<DesignImage>
            //{
            //    new DesignImage { DesignId = design.DesignId, ImageId = images[0].ImageId },
            //    new DesignImage { DesignId = design.DesignId, ImageId = images[1].ImageId }
            //};
            //await _context.DesignImages.AddRangeAsync(designImages);
            //await _context.SaveChangesAsync();
        }
    }

    public static class DatabaseInitialiserExtension
    {
        public static async Task InitialiseDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var initializer = scope.ServiceProvider.GetRequiredService<DatabaseInitialiser>();
            await initializer.InitialiseAsync();
            await initializer.SeedAsync();
        }
    }
}
