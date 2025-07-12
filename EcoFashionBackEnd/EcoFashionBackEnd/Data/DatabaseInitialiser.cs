using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Helpers;
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
        public readonly AppDbContext _context;

        public DatabaseInitialiser(AppDbContext context)
        {
            _context = context;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                // Migration Database - Create database if it does not exist
                await _context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
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
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task TrySeedAsync()
        {
            if (_context.UserRoles.Any() || _context.Users.Any() || _context.DesignsColors.Any() || _context.DesignsSizes.Any() || _context.DesignTypes.Any() || _context.Designs.Any() || _context.Images.Any() || _context.DesignImages.Any()) return;


            var adminRole = new UserRole { RoleName = "Admin", Description = "System administrator" };
            var designerRole = new UserRole { RoleName = "designer", Description = "Fashion designer" };
            var supplierRole = new UserRole { RoleName = "supplier", Description = "Material supplier" };
            var customerRole = new UserRole { RoleName = "customer", Description = "Customer user" };

            await _context.UserRoles.AddRangeAsync(adminRole, designerRole, supplierRole, customerRole);
            await _context.SaveChangesAsync();


            var users = new List<User>
    {
            new User
            {
                Email = "admin@example.com",
                PasswordHash = SecurityUtil.Hash("admin"),
                FullName = "Admin User",
                RoleId = adminRole.RoleId,
                Status = UserStatus.Active
            },
            new User
            {
                Email = "designer@example.com",
                PasswordHash = SecurityUtil.Hash("designer"),
                FullName = "Designer One",
                RoleId = designerRole.RoleId,
                Status = UserStatus.Active
            },
            new User
            {
                Email = "supplier@example.com",
                PasswordHash = SecurityUtil.Hash("supplier"),
                FullName = "Supplier One",
                RoleId = supplierRole.RoleId,
                Status = UserStatus.Active
            },
            new User
            {
                Email = "customer@example.com",
                PasswordHash = SecurityUtil.Hash("customer"),
                FullName = "Customer One",
                RoleId = customerRole.RoleId,
                Status = UserStatus.Active
            }
        };

            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();


            var designerUser = await _context.Users.FirstAsync(u => u.Email == "designer@example.com");
            var supplierUser = await _context.Users.FirstAsync(u => u.Email == "supplier@example.com");


            var designer = await _context.Designers.AddAsync(new Designer
            {
                UserId = designerUser.UserId,
                DesignerName = "Designer One",
                PortfolioUrl = "https://portfolio.designer.com",
                Email = "designer1@example.com",
                Status = "active"
            });
            await _context.SaveChangesAsync();

            await _context.Suppliers.AddAsync(new Supplier
            {
                UserId = supplierUser.UserId,
                SupplierName = "Supplier One",
                PortfolioUrl = "https://supplier.com",
                Email = "supplier1@example.com",
                Status = "active"
            });

            await _context.SaveChangesAsync();

            // Seed DesignsColor
            var colors = new List<DesignsColor>
            {
                new DesignsColor { ColorName = "Red", ColorCode = "#FF0000" },
                new DesignsColor { ColorName = "Blue", ColorCode = "#0000FF" },
                new DesignsColor { ColorName = "Green", ColorCode = "#008000" }
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
            var designTypes = new List<DesignType>
            {
                new DesignType { DesignName = "T-Shirt", SizeId = sizes.First(s => s.SizeName == "M").Id, Meter = 1.5f },
                new DesignType { DesignName = "Jeans", SizeId = sizes.First(s => s.SizeName == "L").Id, Meter = 2.5f }
            };
            await _context.DesignTypes.AddRangeAsync(designTypes);
            await _context.SaveChangesAsync();

            // Seed a Design
            var design = new Design
            {
                DesignerId = designer.Entity.DesignerId,
                Name = "Sample T-Shirt",
                Description = "A basic sample t-shirt.",
                RecycledPercentage = 50.0f,
                CareInstructions = "Machine wash cold.",
                Price = 25.99m,
                Quantity = 100,
                Gender = true,
                ProductScore = 4,
                Status = "approved",
                CreatedAt = DateTime.UtcNow
            };
            await _context.Designs.AddAsync(design);
            await _context.SaveChangesAsync();

            // Seed Images
            var images = new List<Image>
            {
                new Image { ImageUrl = "https://example.com/image1.jpg" },
                new Image { ImageUrl = "https://example.com/image2.jpg" }
            };
            await _context.Images.AddRangeAsync(images);
            await _context.SaveChangesAsync();

            // Seed DesignImages 
            var designImages = new List<DesignImage>
            {
                new DesignImage { DesignId = design.DesignId, ImageId = images[0].ImageId },
                new DesignImage { DesignId = design.DesignId, ImageId = images[1].ImageId }
            };
            await _context.DesignImages.AddRangeAsync(designImages);
            await _context.SaveChangesAsync();
        }
    }

    public static class DatabaseInitialiserExtension
    {
        public static async Task InitialiseDatabaseAsync(this WebApplication app)
        {
            // Create IServiceScope to resolve service scope
            using var scope = app.Services.CreateScope();
            var initializer = scope.ServiceProvider.GetRequiredService<DatabaseInitialiser>();

            await initializer.InitialiseAsync();

            // Try to seeding data
            await initializer.SeedAsync();
        }
    }
}