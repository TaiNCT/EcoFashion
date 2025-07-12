using EcoFashionBackEnd.Entities;

namespace EcoFashionBackEnd.Dtos
{
    public class ApplicationModel
    {
        public int ApplicationId { get; set; }
        public int UserId { get; set; }
        public int TargetRoleId { get; set; }
        
        // Portfolio & Profile Images
        public string? AvatarUrl { get; set; } // Ảnh đại diện cho landing page
        public string? PortfolioUrl { get; set; }
        public string? PortfolioFiles { get; set; } // JSON array of file urls
        public string? BannerUrl { get; set; } // Ảnh banner cho landing page
        public string? SpecializationUrl { get; set; }

        // Social Media
        public string? SocialLinks { get; set; } // JSON object of social media links

        // Identification / Xác minh
        public string? IdentificationNumber { get; set; }
        public string? IdentificationPicture { get; set; }
        public bool IsIdentificationVerified { get; set; } = false;

        //Tracking
        public DateTime CreatedAt { get; set; }
        public DateTime? ProcessedAt { get; set; }

        // Kết quả xử lý
        public int? ProcessedBy { get; set; }
        public string? RejectionReason { get; set; }
        public string? Note { get; set; }

        public string Status { get; set; } = "pending";
        
        // Navigation properties
        public UserModel? User { get; set; }
        public UserRoleModel? Role { get; set; }
        public UserModel? ProcessedByUser { get; set; }

        // Thông tin liên hệ bổ sung cho Designer/Supplier
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        // Thông tin thuế
        public string? TaxNumber { get; set; }
        // Chủ sở hữu ảnh xác thực
        public string? IdentificationPictureOwner { get; set; }
        // Chứng chỉ/giải thưởng
        public string? Certificates { get; set; }
    }
}
