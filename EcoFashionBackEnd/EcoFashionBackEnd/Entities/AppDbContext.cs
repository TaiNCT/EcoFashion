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
        public DbSet<Application> Applications { get; set; }
        public DbSet<SavedSupplier> SavedSuppliers { get; set; }
        public DbSet<Design> Designs { get; set; }
        public DbSet<DesignsColor> DesignsColors { get; set; }
        public DbSet<DesignsSize> DesignsSizes { get; set; }
        public DbSet<DesignsVarient> DesignsVarients { get; set; }
        public DbSet<DesignsFeature> DesignsFeatures { get; set; }
        public DbSet<DesignsMaterial> DesignsMaterials { get; set; }
        public DbSet<DesignsRating> DesignsRatings { get; set; }
        public DbSet<DesignType> DesignTypes { get; set; }
        public DbSet<TypeSize> TypeSizes { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<DesignImage> DesignImages { get; set; }

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

            // APPLICATION
            modelBuilder.Entity<Application>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Application>()
                .HasOne(a => a.Role)
                .WithMany()
                .HasForeignKey(a => a.TargetRoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // SAVED SUPPLIER
            modelBuilder.Entity<SavedSupplier>()
                .HasOne(ss => ss.Designer)
                .WithMany()
                .HasForeignKey(ss => ss.DesignerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SavedSupplier>()
                .HasOne(ss => ss.Supplier)
                .WithMany()
                .HasForeignKey(ss => ss.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);

            // Optional: ENUM string conversion for UserStatus
            modelBuilder.Entity<User>()
                .Property(u => u.Status)
                .HasConversion<string>();

            // Optional: ENUM string conversion for ApplicationStatus
            modelBuilder.Entity<Application>()
                .Property(a => a.Status)
                .HasConversion<string>();

            // Configure relationships for new tables
            modelBuilder.Entity<DesignsVarient>()
                .HasOne(dv => dv.DesignsSize)
                .WithMany()
                .HasForeignKey(dv => dv.SizeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsVarient>()
                .HasOne(dv => dv.Design)
                .WithMany(d => d.DesignsVarients)
                .HasForeignKey(dv => dv.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsVarient>()
                .HasOne(dv => dv.DesignsColor)
                .WithMany()
                .HasForeignKey(dv => dv.ColorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsFeature>()
                .HasOne(df => df.Design)
                .WithOne(d => d.DesignsFeature)
                .HasForeignKey<DesignsFeature>(df => df.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsMaterial>()
                .HasKey(dm => new { dm.DesignIdPk, dm.SavedMaterialIdPk }); // Configure Composite Key

            modelBuilder.Entity<DesignsMaterial>()
                .HasOne(dm => dm.Design)
                .WithMany(d => d.DesignsMaterials)
                .HasForeignKey(dm => dm.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignType>()
                .HasOne(dt => dt.DesignsSize)
                .WithMany()
                .HasForeignKey(dt => dt.SizeId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<TypeSize>()
                .HasKey(ts => new { ts.DesignTypeIdPk, ts.SizeIdPk }); // Configure Composite Key

            // Explicitly configure DesignTypeId and SizeId as foreign keys in TypeSize to avoid potential issues
            modelBuilder.Entity<TypeSize>()
                .HasOne<DesignType>()
                .WithMany()
                .HasForeignKey(ts => ts.DesignTypeId);

            modelBuilder.Entity<TypeSize>()
                .HasOne<DesignsSize>()
                .WithMany()
                .HasForeignKey(ts => ts.SizeId);

            modelBuilder.Entity<DesignsRating>()
                .HasKey(dr => new { dr.DesignIdPk, dr.CustomerIdPk }); // Configure Composite Key

            modelBuilder.Entity<DesignsRating>()
                .HasOne(dr => dr.Design)
                .WithMany(d => d.DesignsRatings)
                .HasForeignKey(dr => dr.DesignId)
                .OnDelete(DeleteBehavior.Cascade);
            // Configure relationship for Design and Image (many-to-many using DesignImage)
            modelBuilder.Entity<DesignImage>()
                .HasOne(di => di.Design)
                .WithMany(d => d.DesignImages)
                .HasForeignKey(di => di.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignImage>()
                .HasOne(di => di.Image)
                .WithMany()
                .HasForeignKey(di => di.ImageId)
                .OnDelete(DeleteBehavior.Cascade);

            // Unique constraint for DesignId and ImageId to prevent duplicates
            modelBuilder.Entity<DesignImage>()
                .HasIndex(di => new { di.DesignId, di.ImageId })
                .IsUnique();
        }
    }
}