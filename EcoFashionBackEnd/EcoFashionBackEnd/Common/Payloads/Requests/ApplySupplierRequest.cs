namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class ApplySupplierRequest
    {
        public string? PortfolioUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? SpecializationUrl { get; set; }
        public string? IdentificationNumber { get; set; }
        // public string? IdentificationPicture { get; set; } // No longer directly accepting URL
        public IFormFile? IdentificationPictureFile { get; set; } // Accepting the file for upload
        public string? Note { get; set; }
    }
}
 