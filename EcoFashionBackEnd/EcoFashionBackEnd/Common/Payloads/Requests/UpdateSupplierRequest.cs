namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class UpdateSupplierRequest
    {
        public string? SupplierName { get; set; }
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
    }
}
