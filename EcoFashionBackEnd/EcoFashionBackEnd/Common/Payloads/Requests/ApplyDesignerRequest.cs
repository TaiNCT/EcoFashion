using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class ApplyDesignerRequest
    {
        // Profile images for landing page
        public IFormFile? AvatarFile { get; set; } // Ảnh đại diện
        public IFormFile? BannerFile { get; set; } // Ảnh banner/cover
        
        public string? PortfolioUrl { get; set; }
        
        // Hỗ trợ upload multiple portfolio files
        public List<IFormFile>? PortfolioFiles { get; set; }
        
        public string? BannerUrl { get; set; } // URL trực tiếp (nếu không upload file)
        public string? SpecializationUrl { get; set; }
        
        // Social media links as JSON string
        [MaxLength(500)]
        public string? SocialLinks { get; set; } // {"instagram": "url", "behance": "url", "facebook": "url"}
        
        public string? IdentificationNumber { get; set; }
        public IFormFile? IdentificationPictureFile { get; set; } 
        
        public string? Note { get; set; }

        // Thông tin liên hệ bổ sung cho Designer
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
