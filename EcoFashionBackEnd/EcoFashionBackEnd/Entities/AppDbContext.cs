using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.Composition;

namespace EcoFashionBackEnd.Entities
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        #region DbSet

        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Designer> Designers { get; set; }

       
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
             .HasOne(u => u.UserRole)
             .WithMany()
             .HasForeignKey(u => u.RoleId)
             .OnDelete(DeleteBehavior.Restrict);
            // SUPPLIER PROFILE
            modelBuilder.Entity<Supplier>()
                .HasOne(sp => sp.User)
                .WithMany()
                .HasForeignKey(sp => sp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // DESIGNER PROFILE
            modelBuilder.Entity<Designer>()
                .HasOne(dp => dp.User)
                .WithMany()
                .HasForeignKey(dp => dp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Optional: ENUM string conversion for UserStatus
            modelBuilder.Entity<User>()
                .Property(u => u.Status)
                .HasConversion<string>();
        }
    }
}