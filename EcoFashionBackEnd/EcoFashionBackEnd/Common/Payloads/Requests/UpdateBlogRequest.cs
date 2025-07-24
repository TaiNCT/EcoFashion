namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class UpdateBlogRequest
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
