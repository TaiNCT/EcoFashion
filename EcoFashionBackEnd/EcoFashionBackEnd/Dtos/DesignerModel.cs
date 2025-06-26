namespace EcoFashionBackEnd.Dtos
{
    public class DesignerModel
    {
        public Guid DesignerId { get; set; }
        public int UserId { get; set; }
        public string? DesignerName { get; set; }
        public string? PortfolioUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? SpecializationUrl { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? TaxNumber { get; set; }
        public string? IdentificationNumber { get; set; }
        public string? IdentificationPicture { get; set; }
        public string? IdentificationPictureOwner { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Status { get; set; }
    }
}
