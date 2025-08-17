namespace EcoFashionBackEnd.Dtos.Wallet
{
    public class WalletTransactionDto
    {
        public int TransactionId { get; set; }
        public double Amount { get; set; }
        public string Type { get; set; }       // Deposit, Payment, Refund, Transfer
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public double BalanceAfter { get; set; }
    }

}
