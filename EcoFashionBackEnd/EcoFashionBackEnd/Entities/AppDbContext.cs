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

        public DbSet<Material> Materials { get; set; }
        public DbSet<MaterialType> MaterialTypes { get; set; }
        public DbSet<DesignDraft> DesignDrafts { get; set; }
        public DbSet<DraftMaterial> DraftMaterials { get; set; }
        public DbSet<MaterialSustainability> MaterialSustainabilities { get; set; }
        public DbSet<SavedMaterial> SavedMaterials { get; set; }
        public DbSet<MaterialImage> MaterialImages { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<SustainabilityCriteria> SustainabilityCriterias { get; set; }
        public DbSet<DesignerMaterialInventory> DesignerMaterialInventories { get; set; }
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

            modelBuilder.Entity<Material>()
                .HasOne(m => m.Supplier).WithMany(s => s.Materials)
                .HasForeignKey(m => m.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Material>()
                .HasOne(m => m.MaterialType).WithMany(mt => mt.Materials)
                .HasForeignKey(m => m.TypeId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Material>()
                .Property(m => m.PricePerUnit)
                .HasPrecision(18, 2);
            modelBuilder.Entity<Material>()
                .Property(m => m.RecycledPercentage)
                .HasPrecision(5, 2);
            modelBuilder.Entity<Material>()
                .Property(m => m.SustainabilityScore)
                .HasPrecision(5, 2);

            modelBuilder.Entity<MaterialSustainability>()
                .HasKey(ms => new { ms.MaterialId, ms.SustainabilityCriteriaId });
            modelBuilder.Entity<MaterialSustainability>()
                .HasOne(ms => ms.Material)
                .WithMany(m => m.MaterialSustainabilities)
                .HasForeignKey(ms => ms.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MaterialSustainability>()
                .HasOne(ms => ms.SustainabilityCriteria)
                .WithMany(sc => sc.MaterialSustainabilities)
                .HasForeignKey(ms => ms.SustainabilityCriteriaId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<MaterialSustainability>()
                .Property(ms => ms.Value)
                .HasPrecision(5, 2);

            modelBuilder.Entity<SavedMaterial>()
                .HasOne(sm => sm.Material)
                .WithMany(m => m.SavedMaterials)
                .HasForeignKey(sm => sm.MaterialId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<SavedMaterial>()
                .HasOne(sm => sm.Designer)
                .WithMany(d => d.SavedMaterials)
                .HasForeignKey(sm => sm.DesignerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DesignDraft>()
                .HasOne(dd => dd.Designer)
                .WithMany(d => d.DesignDrafts)
                .HasForeignKey(dd => dd.DesignerId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<DesignDraft>()
                .Property(dd => dd.Type)
                .HasConversion<string>();
            modelBuilder.Entity<DesignDraft>()
                .Property(dd => dd.RecycledPercentage)
                .HasPrecision(5,2);

            modelBuilder.Entity<DraftMaterial>()
                .HasKey(dm => new { dm.DesignDraftId, dm.MaterialId });
            modelBuilder.Entity<DraftMaterial>()
                .HasOne(dm => dm.DesignDraft)
                .WithMany(dd => dd.DraftMaterials)
                .HasForeignKey(dm => dm.DesignDraftId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DraftMaterial>()
                .HasOne(dm => dm.Material)
                .WithMany(m => m.DraftMaterials)
                .HasForeignKey(dm => dm.MaterialId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<DraftMaterial>()
                .Property(dm => dm.PercentageUsed)
                .HasPrecision(5, 2);

            modelBuilder.Entity<MaterialImage>()
                .HasKey(mi => new { mi.MaterialId, mi.ImageId });
            modelBuilder.Entity<MaterialImage>()
                .HasOne(mi => mi.Material)
                .WithMany(m => m.MaterialImages)
                .HasForeignKey(mi => mi.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MaterialImage>()
                .HasOne(mi => mi.Image)
                .WithMany(i => i.MaterialImages)
                .HasForeignKey(mi => mi.ImageId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DesignerMaterialInventory>()
                .HasOne(dmi => dmi.Designer)
                .WithMany(d => d.DesignerMaterialInventories)
                .HasForeignKey(dmi => dmi.DesignerId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DesignerMaterialInventory>()
                .HasOne(dmi => dmi.Material)
                .WithMany(m => m.DesignerMaterialInventories)
                .HasForeignKey(dmi => dmi.MaterialId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<DesignerMaterialInventory>()
                .Property(dmi => dmi.Status)
                .HasConversion<string>();
        }
    }
}