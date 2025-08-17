namespace EcoFashionBackEnd.Common.Payloads.Requests.Wallet
{
    public class DepositRequest
    {
        public double Amount { get; set; }
        public string? ExternalTxnId { get; set; } // Mã giao dịch từ VNPay/PayPal...
        public string ReturnUrl { get; set; }
    }
}
