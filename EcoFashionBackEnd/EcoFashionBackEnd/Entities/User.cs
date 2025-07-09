using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public required string Email { get; set; }

        [StringLength(10)]
        public string? Phone {  get; set; }

        [Required]
        public required string PasswordHash { get; set; }

        [StringLength(100)]
        public string? FullName { get; set; }

        // OTP Fields for email verification
        [StringLength(6)]
        public string? OTPCode { get; set; }
        
        public DateTime? OTPExpiresAt { get; set; }

       // [ForeignKey("UserRole")]
        public int RoleId { get; set; }
        public virtual UserRole? UserRole { get; set; }

        [Required]
        [EnumDataType(typeof(UserStatus))]
        public UserStatus Status { get; set; } = UserStatus.Pending;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set;}

        public ICollection<Application> Applications { get; set; } = new List<Application>();
        public ICollection<Blog> Blogs { get; set; } = new List<Blog>();
        public ICollection<DesignerLike> DesignerLikes { get; set; } = new List<DesignerLike>();
        public ICollection<DesignRating> DesignRatings { get; set; } = new List<DesignRating>();
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }

    public enum UserStatus
    {
        Pending,
        Active,
        Rejected,
        Inactive
    }
}
