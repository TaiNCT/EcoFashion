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

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Design> Designs { get; set; }
        public DbSet<DesignColor> DesignColors { get; set; }
        public DbSet<DesignDraft> DesignDrafts { get; set; }
        public DbSet<DesignerLike> DesignerLikes { get; set; }
        public DbSet<DesignFeature> DesignFeatures { get; set; }
        public DbSet<DesignImage> DesignImages { get; set; }
        public DbSet<DesignMaterial> DesignMaterials { get; set; }
        public DbSet<DesignRating> DesignRatings { get; set; }
        public DbSet<DesignSize> DesignSizes { get; set; }
        public DbSet<DesignType> DesignTypes { get; set; }
        public DbSet<DesignVarient> DesignVarients { get; set; }
        public DbSet<DraftMaterial> DraftMaterials { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<MaterialImage> MaterialImages { get; set; }
        public DbSet<MaterialSustainability> MaterialSustainabilities { get; set; }
        public DbSet<MaterialType> MaterialTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        //public DbSet<Paymemntransaction> Paymemntransactions { get; set; }
        //public DbSet<RefundItem> RefundItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<SavedMaterial> SavedMaterials { get; set; }
        public DbSet<SupOrder> SupOrders { get; set; }
        public DbSet<SustainabilityCriteria> SustainabilityCriterias { get; set; }

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
                .WithMany(u => u.Applications)
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

        #region require to add ondelete

            modelBuilder.Entity<Blog>()
                .HasOne(b => b.User).WithMany(u => u.Blogs)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<Design>()
                .HasOne(d => d.Designer).WithMany(dr => dr.Designs)
                .HasForeignKey(d => d.DesignerId);
            modelBuilder.Entity<Design>()
                .Property(d => d.Status)
                .HasConversion<string>();
            modelBuilder.Entity<Design>()
                .Property(d => d.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<DesignDraft>()
                .HasOne(d => d.Designer).WithMany(dr => dr.DesignDrafts)
                .HasForeignKey(d => d.DesignerId);
            modelBuilder.Entity<DesignDraft>()
                .Property(d => d.Type)
                .HasConversion<string>();

            modelBuilder.Entity<DesignerLike>()
                .HasOne(d => d.Designer).WithMany(dl => dl.DesignerLikes)
                .HasForeignKey(d => d.DesignerId);
            modelBuilder.Entity<DesignerLike>()
                .HasOne(u => u.User).WithMany(dl => dl.DesignerLikes)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DesignFeature>()
                .HasOne(df => df.Design).WithMany(d => d.DesignFeatures)
                .HasForeignKey(df => df.DesignId);

            modelBuilder.Entity<DesignImage>()
                .HasOne(di => di.Image).WithMany(i => i.DesignImages)
                .HasForeignKey(di => di.ImageId);
            modelBuilder.Entity<DesignImage>()
                .HasOne(di => di.DesignDraft).WithMany(dd => dd.DesignImages)
                .HasForeignKey(di => di.DraftId);

            modelBuilder.Entity<DesignMaterial>()
                .HasKey(dm => new { dm.DesignId, dm.SavedMaterialId });
            modelBuilder.Entity<DesignMaterial>()
                .HasOne(dm => dm.Design).WithMany(d => d.DesignMaterials)
                .HasForeignKey(dm => dm.DesignId);
            modelBuilder.Entity<DesignMaterial>()
                .HasOne(dm => dm.SavedMaterial).WithMany(sm => sm.DesignMaterials)
                .HasForeignKey(dm => dm.SavedMaterialId);

            modelBuilder.Entity<DesignRating>()
                .HasKey(dr => new { dr.DesignId, dr.UserId });
            modelBuilder.Entity<DesignRating>()
                .HasOne(dr => dr.Design).WithMany(d => d.DesignRatings)
                .HasForeignKey(dr => dr.DesignId);
            modelBuilder.Entity<DesignRating>()
                .HasOne(dr => dr.User).WithMany(u => u.DesignRatings)
                .HasForeignKey(dr => dr.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<DesignType>()
                .HasOne(dt => dt.DesignSize).WithMany(ds => ds.DesignTypes)
                .HasForeignKey(dt => dt.SizeId);

            modelBuilder.Entity<DesignVarient>()
                .HasOne(dv => dv.DesignSize).WithMany(ds => ds.DesignVarients)
                .HasForeignKey(dv => dv.SizeId);
            modelBuilder.Entity<DesignVarient>()
                .HasOne(dv => dv.DesignDraft).WithMany(dd => dd.DesignVarients)
                .HasForeignKey(dv => dv.DesignId);
            modelBuilder.Entity<DesignVarient>()
                .HasOne(dv => dv.DesignColor).WithMany(dc => dc.DesignVarients)
                .HasForeignKey(dv => dv.ColorId);

            modelBuilder.Entity<DraftMaterial>()
                .HasKey(dm => new {dm.DraftId, dm.MaterialId});
            modelBuilder.Entity<DraftMaterial>()
                .HasOne(dm => dm.DesignDraft).WithMany(dd => dd.DraftMaterials)
                .HasForeignKey(dm => dm.DraftId);
            modelBuilder.Entity<DraftMaterial>()
                .HasOne(dm => dm.Material).WithMany(m => m.DraftMaterials)
                .HasForeignKey(dm => dm.MaterialId);

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User).WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId);
            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Design).WithMany(d => d.Favorites)
                .HasForeignKey(f => f.DesignId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Designer).WithMany(d => d.Favorites)
                .HasForeignKey(f => f.DesignerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Material>()
                .HasOne(m => m.MaterialType).WithMany(mt => mt.Materials)
                .HasForeignKey(m => m.TypeId);
            modelBuilder.Entity<Material>()
                .HasOne(m => m.Supplier).WithMany(s => s.Materials)
                .HasForeignKey(m => m.SupplierId);
            modelBuilder.Entity<Material>()
                .Property(m => m.PricePerUnit).HasPrecision(18, 2);

            modelBuilder.Entity<MaterialImage>()
                .HasOne(mi => mi.Material).WithMany(m => m.MaterialImages)
                .HasForeignKey(mi => mi.MaterialId);
            modelBuilder.Entity<MaterialImage>()
                .HasOne(mi => mi.Image).WithMany(i => i.MaterialImages)
                .HasForeignKey(mi => mi.ImageId);

            modelBuilder.Entity<MaterialSustainability>()
                .HasKey(ms => new {ms.MaterialId, ms.CriterionId});
            modelBuilder.Entity<MaterialSustainability>()
                .HasOne(ms => ms.Material).WithMany(m => m.MaterialSustainabilities)
                .HasForeignKey(ms => ms.MaterialId);
            modelBuilder.Entity<MaterialSustainability>()
                .HasOne(ms => ms.SustainabilityCriteria).WithMany(sc => sc.MaterialSustainabilities).HasForeignKey(ms => ms.CriterionId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User).WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);
            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice).HasPrecision(18, 2);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order).WithMany(o => o.OrderDetails)
                .HasForeignKey(or =>  or.OrderId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Design).WithMany(d => d.OrderDetails)
                .HasForeignKey(or => or.DesignId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Designer).WithMany(dr => dr.OrderDetails)
                .HasForeignKey(od => od.DesignerId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Material).WithMany(m => m.OrderDetails)
                .HasForeignKey(od => od.MaterialId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Supplier).WithMany(s => s.OrderDetails)
                .HasForeignKey(od => od.SupplierID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OrderDetail>()
                .Property(od => od.UnitPrice).HasPrecision(18, 2);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User).WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Design).WithMany(d => d.Reviews)
                .HasForeignKey(r => r.DesignId);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Designer).WithMany(dr => dr.Reviews)
                .HasForeignKey(r => r.DesignerId);

            modelBuilder.Entity<SavedMaterial>()
                .HasOne(sm => sm.Material).WithMany(m => m.SavedMaterials)
                .HasForeignKey(sm => sm.MaterialId);
            modelBuilder.Entity<SavedMaterial>()
                .HasOne(sm => sm.Designer).WithMany(d => d.SavedMaterials)
                .HasForeignKey(sm => sm.DesignerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SupOrder>()
                .HasOne(so => so.Order).WithMany(o => o.SupOrders)
                .HasForeignKey(so => so.OrderId);
            modelBuilder.Entity<SupOrder>()
                .HasOne(so => so.Supplier).WithMany(s => s.SupOrders)
                .HasForeignKey(so => so.SupplierId);
            modelBuilder.Entity<SupOrder>()
                .HasOne(so => so.Designer).WithMany(d => d.SupOrders)
                .HasForeignKey(so => so.DesignerId);
        #endregion
        }
    }
}