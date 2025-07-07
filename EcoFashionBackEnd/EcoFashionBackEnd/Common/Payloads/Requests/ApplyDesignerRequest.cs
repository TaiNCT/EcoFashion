namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class ApplyDesignerRequest
    {
        public string? PortfolioUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? SpecializationUrl { get; set; }
        public string? IdentificationNumber { get; set; }
        public IFormFile? IdentificationPictureFile { get; set; } 
        public string? Note { get; set; }
    }
}
