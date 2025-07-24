using EcoFashionBackEnd.Entities.EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<DesignsVariant> DesignsVarients { get; set; }
        public DbSet<DesignsMaterial> DesignsMaterials { get; set; }
        public DbSet<DesignsColor> DesignsColors { get; set; }
        public DbSet<DesignImage> DesignImages { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<TypeSize> TypeSizes { get; set; }
        public DbSet<DesignFeature> DesignFeatures { get; set; }
        public DbSet<DesignsSize> DesignsSizes { get; set; }
        public DbSet<DesignsType> DesignsTypes { get; set; }
        public DbSet<DesignerMaterialInventory> DesignerMaterialInventories { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<MaterialImage> MaterialImages { get; set; }
        public DbSet<SustainabilityCriteria> SustainabilityCriterias { get; set; }
        public DbSet<MaterialSustainability> MaterialSustainabilities { get; set; }
        public DbSet<MaterialType> MaterialTypes { get; set; }
        public DbSet<MaterialTypeBenchmark> MaterialTypesBenchmarks { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.UserRole)
                .WithMany()
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
            #region user

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

            modelBuilder.Entity<User>()
             .Property(u => u.Status)
             .HasConversion<string>();

            modelBuilder.Entity<Application>()
                .Property(a => a.Status)
                .HasConversion<string>();
            #endregion
            #region DESIGN
            modelBuilder.Entity<DesignsColor>()
                .HasMany(c => c.Variants)
                .WithOne(v => v.DesignsColor)
                .HasForeignKey(v => v.ColorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsSize>()
                .HasMany(s => s.Variants)
                .WithOne(v => v.DesignsSize)
                .HasForeignKey(v => v.SizeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsVariant>()
                .HasOne(v => v.Design)
                .WithMany(d => d.DesignsVariants)
                .HasForeignKey(v => v.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsVariant>()
                .HasOne(v => v.DesignsSize)
                .WithMany()
                .HasForeignKey(v => v.SizeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsVariant>()
                .HasOne(v => v.DesignsColor)
                .WithMany()
                .HasForeignKey(v => v.ColorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsMaterial>()
                .HasKey(dm => new { dm.DesignId, dm.MaterialId });

            modelBuilder.Entity<DesignsMaterial>()
                .HasOne(dm => dm.Designs)
                .WithMany(d => d.DesignsMaterials)
                .HasForeignKey(dm => dm.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DesignsMaterial>()
                .HasOne(dm => dm.Materials)
                .WithMany()
                .HasForeignKey(dm => dm.MaterialId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DesignFeature>()
                .HasOne(df => df.Design)
                .WithOne(d => d.DesignsFeature)
                .HasForeignKey<DesignFeature>(df => df.DesignId)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<DesignImage>()
                .HasIndex(di => new { di.DesignId, di.ImageId })
                .IsUnique();

            modelBuilder.Entity<Design>()
                .HasOne(d => d.DesignTypes)
                .WithMany()
                .HasForeignKey(d => d.DesignTypeId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Design>()
                .Property(d => d.Price)
                .HasPrecision(18, 2);

            #endregion

            #region Material 
            // Configure relationships for Materials
            modelBuilder.Entity<Material>()
                .HasOne(m => m.SupplierProfile)
                .WithMany()
                .HasForeignKey(m => m.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Material>()
                .HasOne(m => m.MaterialType)
                .WithMany()
                .HasForeignKey(m => m.TypeId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Material>()
                .Property(m => m.PricePerUnit)
                .HasPrecision(18, 2);
            modelBuilder.Entity<Material>()
                .Property(m => m.RecycledPercentage)
                .HasPrecision(5, 2);

            modelBuilder.Entity<MaterialImage>()
                .HasOne(mi => mi.Material)
                .WithMany(m => m.MaterialImages)
                .HasForeignKey(mi => mi.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MaterialImage>()
                .HasOne(mi => mi.Image)
                .WithMany()
                .HasForeignKey(mi => mi.ImageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MaterialSustainability>()
                .HasKey(ms => new { ms.MaterialId, ms.CriterionId });

            modelBuilder.Entity<MaterialSustainability>()
                .HasOne(ms => ms.Material)
                .WithMany(m => m.MaterialSustainabilityMetrics)
                .HasForeignKey(ms => ms.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MaterialSustainability>()
                .HasOne(ms => ms.SustainabilityCriterion)
                .WithMany()
                .HasForeignKey(ms => ms.CriterionId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MaterialSustainability>()
                .Property(ms => ms.Value)
                .HasPrecision(18, 2);

            modelBuilder.Entity<DesignerMaterialInventory>()
                .HasOne(dmi => dmi.Designer)
                .WithMany()
                .HasForeignKey(dmi => dmi.DesignerId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DesignerMaterialInventory>()
                .HasOne(dmi => dmi.Material)
                .WithMany()
                .HasForeignKey(dmi => dmi.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DesignerMaterialInventory>()
                .Property(dmi => dmi.Cost)
                .HasPrecision(18, 2);

            modelBuilder.Entity<MaterialTypeBenchmark>()
                .HasOne(mt => mt.MaterialType)
                .WithMany()
                .HasForeignKey(mt => mt.TypeId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MaterialTypeBenchmark>()
                .HasOne(mt => mt.SustainabilityCriteria)
                .WithMany()
                .HasForeignKey(mt => mt.CriteriaId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MaterialTypeBenchmark>()
                .Property(mt => mt.Value)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Blog>()
                .HasOne(b => b.Supplier)
                .WithMany(s => s.Blogs)
                .HasForeignKey(b => b.SupplierId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Blog>()
                .HasOne(b => b.Material)
                .WithOne(m => m.Blog)
                .HasForeignKey<Blog>(b => b.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);
            #endregion
            #region unique


            modelBuilder.Entity<TypeSize>()
                .HasKey(ts => new { ts.DesignTypeIdPk, ts.SizeIdPk }); 

            modelBuilder.Entity<TypeSize>()
                .HasOne<DesignsSize>()
                .WithMany()
                .HasForeignKey(ts => ts.SizeId);

            modelBuilder.Entity<TypeSize>()
                .HasOne<DesignsType>()
                .WithMany()
                .HasForeignKey(ts => ts.DesignTypeId);
            #endregion

        }
    }
}