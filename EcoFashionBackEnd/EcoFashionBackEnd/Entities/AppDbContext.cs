using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        #region Dbset
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
    


        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Home>()
            .HasOne(h => h.User)
            .WithMany() // Assuming User has many Homes
            .HasForeignKey(h => h.UserId)
            .OnDelete(DeleteBehavior.NoAction); // No cascading delete*/
        }
    }
}