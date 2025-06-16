using Microsoft.EntityFrameworkCore;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Helpers;
using Microsoft.CodeAnalysis;

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
            // Check if the database is already seeded
            if (_context.UserRoles.Any() || _context.Homes.Any() || _context.Users.Any())
            {
                return; // Database already seeded
            }

            // Seed UserRoles
            var adminRole = new UserRole { RoleName = "Admin" };
            var designerRole = new UserRole { RoleName = "Designer" };
            var supplierRole = new UserRole { RoleName = "Supplier" };

            List<UserRole> userRoles = new()
            {
                adminRole,designerRole,supplierRole
            };
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