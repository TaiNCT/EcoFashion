namespace EcoFashionBackEnd.Common.Payloads.Requests
{
    public class CreateCustomerRequest
    {
        public string? Email { get; set; }
        public required string Password { get; set; }
        public string? Phone { get; set; }
    }
}