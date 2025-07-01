namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class ApplyDesignerRequest
    {
      //  public int UserId { get; set; } // ID của người dùng đã đăng ký trước đó
        public string? PortfolioUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? SpecializationUrl { get; set; }
        public string? IdentificationNumber { get; set; }
        public string? IdentificationPicture { get; set; }
        public string? Note { get; set; }
    }
}
