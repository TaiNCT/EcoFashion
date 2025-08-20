using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

public interface IOrderPayoutService
{
    Task ProcessPayoutsAsync();
}

public class OrderPayoutService : IOrderPayoutService
{
    private readonly AppDbContext _context;

    public OrderPayoutService(AppDbContext context)
    {
        _context = context;
    }

    public async Task ProcessPayoutsAsync()
    {
        var orders = await _context.Orders
            .Where(o => o.FulfillmentStatus == FulfillmentStatus.Delivered)
            .ToListAsync();

        if (!orders.Any()) return;

        var systemWallet = await _context.Wallets
            .FirstOrDefaultAsync(w => w.WalletId == 1); // ví admin (system)

        foreach (var order in orders)
        {
            // 1. Resolve seller
            var sellerUser = await GetSellerUserAsync(order.SellerType, order.SellerId);
            if (sellerUser == null) continue;

            var sellerWallet = await _context.Wallets
                .FirstOrDefaultAsync(w => w.UserId == sellerUser.UserId);
            if (sellerWallet == null) continue;

            // 2. Tính toán số tiền
            var orderAmount = order.TotalPrice;
            var systemFee = orderAmount * 0.1m; // ví dụ 10%
            var sellerAmount = orderAmount - systemFee;

            // 3. Ghi transaction cho System Wallet (-)
            _context.WalletTransactions.Add(new WalletTransaction
            {
                WalletId = systemWallet.WalletId,
                Amount = (double)-sellerAmount,
                Description = $"Payout order {order.OrderId} to {order.SellerType} {order.SellerId}",
                CreatedAt = DateTime.UtcNow
            });

            // 4. Ghi transaction cho Seller Wallet (+)
            _context.WalletTransactions.Add(new WalletTransaction
            {
                WalletId = sellerWallet.WalletId,
                Amount = (double)sellerAmount,
                Description = $"Received payout for order {order.OrderId}, fee {systemFee}",
                CreatedAt = DateTime.UtcNow
            });

            // 5. Update số dư ví
            systemWallet.Balance -= (double)sellerAmount;
            sellerWallet.Balance += (double)sellerAmount;

            // 6. Mark order đã payout
            //order.IsPaidOut = true;
        }

        await _context.SaveChangesAsync();
    }

    private async Task<User?> GetSellerUserAsync(string? sellerType, Guid? sellerId)
    {
        if (sellerType == "Supplier")
        {
            var supplier = await _context.Suppliers
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.SupplierId == sellerId);
            return supplier?.User;
        }
        else if (sellerType == "Designer")
        {
            var designer = await _context.Designers
                .Include(d => d.User)
                .FirstOrDefaultAsync(d => d.DesignerId == sellerId);
            return designer?.User;
        }
        return null;
    }
}
