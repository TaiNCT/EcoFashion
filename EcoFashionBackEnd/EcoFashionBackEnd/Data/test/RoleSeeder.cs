using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public static class RoleSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.UserRoles.AnyAsync()) return;

            var roles = new List<UserRole>
        {
            new UserRole { RoleName = "Admin" ,Description = "System administrator"},
            new UserRole { RoleName = "Designer", Description = "Fashion designer"  },
            new UserRole { RoleName = "Supplier", Description = "Material supplier"  },
            new UserRole { RoleName = "Customer", Description = "Customer user"  }
        };

            await context.UserRoles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }
    }

}