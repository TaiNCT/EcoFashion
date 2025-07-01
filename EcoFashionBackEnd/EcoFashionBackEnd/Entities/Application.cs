using EcoFashionBackEnd.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum ApplicationStatus
{
    pending,
    approved,
    rejected
}

[Table("Applications")]
public class Application
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ApplicationId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public virtual User User { get; set; }

    [ForeignKey("Role")]
    public int TargetRoleId { get; set; }
    public virtual UserRole Role { get; set; }

    public string? PortfolioUrl { get; set; }
    public string? BannerUrl { get; set; }
    public string? SpecializationUrl { get; set; }
    public string? IdentificationNumber { get; set; }
    public string? IdentificationPicture { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ProcessedAt { get; set; }    // Thời gian admin xử lý
    public int? ProcessedBy { get; set; }         // Admin ID xử lý
    public string? RejectionReason { get; set; }  // Lý do từ chối (nếu rejected)

    public string? Note { get; set; }

    public ApplicationStatus Status { get; set; } = ApplicationStatus.pending;
}