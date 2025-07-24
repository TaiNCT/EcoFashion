namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class CreateBlogRequest
    {
        public required int MaterialId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
    }
}
