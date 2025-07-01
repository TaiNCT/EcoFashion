using EcoFashionBackEnd.Entities;

namespace EcoFashionBackEnd.Dtos
{
    public class ApplicationModel
    {
        public int ApplicationId { get; set; }
        public int UserId { get; set; }
        public int TargetRoleId { get; set; }
        public string? PortfolioUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? SpecializationUrl { get; set; }
        public string? IdentificationNumber { get; set; }
        public string? IdentificationPicture { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ProcessedAt { get; set; }
        public int? ProcessedBy { get; set; }
        public string? RejectionReason { get; set; }
        public string? Note { get; set; }
        public string Status { get; set; } = "pending";
        
        // Navigation properties
        public UserModel? User { get; set; }
        public UserRoleModel? Role { get; set; }
    }
}
