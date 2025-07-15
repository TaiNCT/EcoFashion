using Microsoft.EntityFrameworkCore;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Helpers;
using Microsoft.CodeAnalysis;
using Org.BouncyCastle.Crypto.Generators;

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
            if (_context.UserRoles.Any() || _context.Users.Any()) return;

           
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

            await _context.Designers.AddAsync(new Designer
            {
                UserId = designerUser.UserId,
                DesignerName = "Designer One",
                PortfolioUrl = "https://portfolio.designer1.com",
                Email = "designer1@example.com",
                Status = "active"
            });

            await _context.Suppliers.AddAsync(new Supplier
            {
                UserId = supplierUser.UserId,
                SupplierName = "Supplier One",
                PortfolioUrl = "https://supplier1.com",
                Email = "supplier1@example.com",
                Status = "active"
            });

            var materialTypes = new List<MaterialType> {
                new MaterialType { Name = "Recycled Polyester" },
                new MaterialType { Name = "Recycled Cotton"},
                new MaterialType { Name = "Recycled Wool"},
                new MaterialType { Name = "Recycled Nylon"},
                new MaterialType { Name = "Recycled Denim"},
            };
            await _context.MaterialTypes.AddRangeAsync(materialTypes);

            var SustainabilityCriteria = new List<SustainabilityCriteria>
            {
                new SustainabilityCriteria {
                    CriteriaName = "carbon_footprint",
                    Description = "Lower carbon footprint than conventional methods",
                    Unit = "kg" },
                new SustainabilityCriteria{
                    CriteriaName = "water_usage",
                    Description = "Compared to conventional production",
                    Unit = "liters"
                },
                new SustainabilityCriteria{
                    CriteriaName = "waste_diverted",
                    Description = "Textile waste kept out of landfills",
                    Unit = "kg"
                },
            };
            await _context.SustainabilityCriterias.AddRangeAsync(SustainabilityCriteria);
            await _context.SaveChangesAsync();

            var supplier = _context.Suppliers.First();
            var materials = new List<Material>
            {
                new Material
                {
                    MaterialName = "Organic Cotton",
                    TypeId = materialTypes[0].TypeId,
                    SupplierId = supplier.SupplierId,
                    RecycledPercentage = 90,
                    QuantityAvailable = 1000,
                    PricePerUnit = 4.5m,
                    DocumentationUrl = "https://docs.organiccotton.com/quality-certification.pdf",
                    SustainabilityScore = 8.2m,
                    MaterialDescription = "Natural cotton fabric"
                },
                new Material
                {
                    MaterialName = "Recycled Hemp",
                    TypeId = materialTypes[1].TypeId,
                    SupplierId = supplier.SupplierId,
                    RecycledPercentage = 80,
                    QuantityAvailable = 500,
                    PricePerUnit = 6.5m,
                    DocumentationUrl = "https://docs.recycledhemp.com/quality-certification.pdf",
                    SustainabilityScore = 7.5m,
                    MaterialDescription = "Durable recycled hemp"
                },
                new Material
                {
                    MaterialName = "RPET Plastic",
                    TypeId = materialTypes[2].TypeId,
                    SupplierId = supplier.SupplierId,
                    RecycledPercentage = 95,
                    QuantityAvailable = 800,
                    PricePerUnit = 3.5m,
                    DocumentationUrl = "https://docs.rpetplastic.com/quality-certification.pdf",
                    SustainabilityScore = 8.8m,
                    MaterialDescription = "Recycled PET plastic"
                }
            };
            await _context.Materials.AddRangeAsync(materials);
            await _context.SaveChangesAsync();

            var materialSustainabilities = new List<MaterialSustainability>
            {
                new MaterialSustainability
                {
                    MaterialId = materials[0].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[0].SustainabilityCriteriaId,
                    Value = 1.2m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[0].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[1].SustainabilityCriteriaId,
                    Value = 2.3m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[0].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[2].SustainabilityCriteriaId,
                    Value = 1.5m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[1].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[0].SustainabilityCriteriaId,
                    Value = 2.2m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[1].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[1].SustainabilityCriteriaId,
                    Value = 1.8m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[1].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[2].SustainabilityCriteriaId,
                    Value = 2.9m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[2].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[0].SustainabilityCriteriaId,
                    Value = 2.1m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[2].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[1].SustainabilityCriteriaId,
                    Value = 3.2m
                },
                new MaterialSustainability
                {
                    MaterialId = materials[2].MaterialId,
                    SustainabilityCriteriaId = SustainabilityCriteria[2].SustainabilityCriteriaId,
                    Value = 1.1m
                }
            };
            await _context.MaterialSustainabilities.AddRangeAsync(materialSustainabilities);

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