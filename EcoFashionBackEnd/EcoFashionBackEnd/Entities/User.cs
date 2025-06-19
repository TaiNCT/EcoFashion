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

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [StringLength(100)]
        public string? FullName { get; set; }

       // [ForeignKey("UserRole")]
        public int RoleId { get; set; }
        public virtual UserRole UserRole { get; set; }

        [Required]
        [EnumDataType(typeof(UserStatus))]
        public UserStatus Status { get; set; } = UserStatus.Pending;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum UserStatus
    {
        Pending,
        Active,
        Rejected,
        Inactive
    }
}
