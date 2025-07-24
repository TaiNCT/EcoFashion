using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Seeders;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public interface IDatabaseInitialiser
    {
        Task InitialiseAsync();
        Task SeedAsync();
        Task TrySeedAsync();
    }
    public class DatabaseInitialiser : IDatabaseInitialiser
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
           
        }

        public async Task TrySeedAsync()
        {
            try
            {
                await RoleSeeder.SeedAsync(_context);
                await UserSeeder.SeedAsync(_context);
                await ApplicationSeeder.SeedAsync(_context);
                await DesignerSeeder.SeedAsync(_context);
                await SupplierSeeder.SeedAsync(_context);
                await MaterialTypeSeeder.SeedAsync(_context);
                await MaterialSeeder.SeedAsync(_context);
                await MaterialImageSeeder.SeedAsync(_context);
                await DesignColorSeeder.SeedAsync(_context);
                await DesignsSizeSeeder.SeedAsync(_context);
                await DesignsTypeSeeder.SeedAsync(_context);
                await SustainableCriteriaSeeder.SeedAsync(_context);
                await MaterialSustainabilitySeeder.SeedAsync(_context);
                await DesignSeeder.SeedAsync(_context);
                await DesignMaterialSeeder.SeedAsync(_context);
                await DesignImageSeeder.SeedAsync(_context);
                await MaterialTypeBenchmarkSeeder.SeedAsync(_context);
                await DesignTypeSizeRatioSeeder.SeedAsync(_context);
                await DesignerMaterialInventorySeeder.SeedAsync(_context);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Seed error: " + ex.Message);
            }
        }
       
    }
        public static class DatabaseInitialiserExtension
        {
            public static async Task InitialiseDatabaseAsync(this WebApplication app)
            {
                using var scope = app.Services.CreateScope();
                var initializer = scope.ServiceProvider.GetRequiredService<IDatabaseInitialiser>();
                await initializer.InitialiseAsync();
                await initializer.SeedAsync();
             await initializer.TrySeedAsync();

        }
    }

}
