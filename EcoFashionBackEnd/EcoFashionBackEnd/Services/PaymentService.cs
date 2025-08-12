using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Extensions.NewFolder;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Services
{
    public class PaymentService
    {
        private readonly IRepository<User, int> _userRepository;
        private readonly IVnPayService _vnPayService;
        private readonly IRepository<Order, int> _orderRepository;
        private readonly IRepository<PaymentTransaction, int> _paymentTransactionRepository;

        public PaymentService(
            IRepository<User, int> userRepository,
            IVnPayService vnPayService,
            IRepository<Order, int> orderRepository,
            IRepository<PaymentTransaction, int> paymentTransactionRepository
           )
        {
            _userRepository= userRepository;
            _vnPayService = vnPayService;
            _orderRepository = orderRepository;
            _paymentTransactionRepository = paymentTransactionRepository;
        }

        public async Task<string> CreateVNPayUrlAsync(HttpContext context, VnPaymentRequestModel model, int userId)
        {
            var order = await _orderRepository.GetByIdAsync(model.OrderId);
            if (order == null)
                throw new Exception("Order not found");

            if (order.UserId != userId)
                throw new UnauthorizedAccessException("Bạn không có quyền truy cập đơn hàng này.");

            // Luôn tạo attempt mới để tránh reuse TxnRef
            var transaction = new PaymentTransaction
            {
                Id = Guid.NewGuid(),
                OrderId = order.OrderId,
                UserId = userId,
                Amount = (long)model.Amount,
                Status = "Pending",
                OrderType = order.SellerType,
                PaymentType = "VNPay",
                Provider = "VNPAY",
                CreatedAt = DateTime.UtcNow
            };
            await _paymentTransactionRepository.AddAsync(transaction);
            await _paymentTransactionRepository.Commit();

            // Sinh TxnRef unique
            var attemptNo = await _paymentTransactionRepository
                .FindByCondition(tx => tx.OrderId == model.OrderId)
                .CountAsync();
            var txnRef = $"ORD-{order.OrderId}-{attemptNo + 1}-{DateTime.UtcNow:yyyyMMddHHmmss}";
            model.TxnRef = txnRef;

            // Tạo URL thanh toán tại VNPAY
            var paymentUrl = await _vnPayService.CreatePaymentUrlAsync(context, model);

            // Lưu lại TxnRef và PayUrl để idempotent và resume UX
            transaction.TxnRef = txnRef;
            transaction.PayUrl = paymentUrl;
            _paymentTransactionRepository.Update(transaction);
            await _paymentTransactionRepository.Commit();

            return paymentUrl;
        }





        public async Task<VnPaymentResponseModel> HandleVNPayReturnAsync(IQueryCollection collection)
        {
            var response = _vnPayService.PaymentExecute(collection);

            if (!int.TryParse(response.OrderId, out var orderId))
            {
                throw new Exception("Invalid OrderId in VNPay response");
            }

            // Ưu tiên map theo TxnRef nếu có
            PaymentTransaction? transaction = null;
            if (!string.IsNullOrWhiteSpace(response.TxnRef))
            {
                transaction = await _paymentTransactionRepository
                    .FindByCondition(pt => pt.TxnRef == response.TxnRef)
                    .FirstOrDefaultAsync();
            }
            transaction ??= await _paymentTransactionRepository
                .FindByCondition(pt => pt.OrderId == orderId && pt.Status == "Pending")
                .OrderByDescending(pt => pt.CreatedAt)
                .FirstOrDefaultAsync();

            if (transaction == null)
            {
                throw new Exception($"Transaction not found for OrderId: {orderId}");
            }

            // Idempotent: nếu đã Paid/Failed thì bỏ qua
            if (string.Equals(transaction.Status, "Paid", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(transaction.Status, "Failed", StringComparison.OrdinalIgnoreCase))
            {
                return response;
            }

            transaction.Status = response.VnPayResponseCode == "00" ? "Paid" : "Failed";
            transaction.VnPayTransactionId = response.TransactionId;
            transaction.VnPayResponseCode = response.VnPayResponseCode;
            transaction.PaidAt = DateTime.UtcNow;
            transaction.Message = GetMessageFromResponseCode(response.VnPayResponseCode);
            transaction.BankCode = response.BankCode;
            transaction.ReturnPayload = string.Join('&', collection.Select(kv => $"{kv.Key}={kv.Value}"));
            _paymentTransactionRepository.Update(transaction);
            await _paymentTransactionRepository.Commit();

            var order = await _orderRepository.FindByCondition(o => o.OrderId == orderId)
                                                                .FirstOrDefaultAsync();

            if (order == null)
            {
                throw new Exception($"Order not found for OrderId: {orderId}");
            }

            // Chỉ cập nhật nếu chưa được xử lý (idempotent)
            bool shouldUpdate = false;
            
            if (response.VnPayResponseCode == "00" && order.PaymentStatus != PaymentStatus.Paid)
            {
                order.Status = OrderStatus.delivered; // Hoàn thành đơn hàng
                order.PaymentStatus = PaymentStatus.Paid;
                order.FulfillmentStatus = FulfillmentStatus.Delivered; // Đã giao hàng
                shouldUpdate = true;
            }
            else if (response.VnPayResponseCode != "00" && order.PaymentStatus == PaymentStatus.Pending)
            {
                order.Status = OrderStatus.pending; 
                order.PaymentStatus = PaymentStatus.Failed;
                shouldUpdate = true;
            }

            if (shouldUpdate)
            {
                _orderRepository.Update(order);
                await _orderRepository.Commit();
            }
            return response;
        }
        //HandleVNPayIpnAsync
        public async Task<object> HandleVNPayIpnAsync(IQueryCollection collection)
        {
            var response = _vnPayService.PaymentExecute(collection);

            if (!int.TryParse(response.OrderId, out var orderId))
            {
                return new { RspCode = "01", Message = "Invalid OrderId" };
            }

            var txnRef = response.TxnRef;
            var transactionQuery = _paymentTransactionRepository.FindByCondition(pt => pt.OrderId == orderId);
            if (!string.IsNullOrWhiteSpace(txnRef))
            {
                transactionQuery = _paymentTransactionRepository.FindByCondition(pt => pt.TxnRef == txnRef);
            }
            var transaction = await transactionQuery.OrderByDescending(t => t.CreatedAt).FirstOrDefaultAsync();
            if (transaction == null)
            {
                return new { RspCode = "01", Message = "Transaction not found" };
            }

            // Verify signature đã làm trong PaymentExecute
            var isSuccess = response.VnPayResponseCode == "00";

            // Idempotent: nếu đã cập nhật thì bỏ qua
            if (string.Equals(transaction.Status, "Paid", StringComparison.OrdinalIgnoreCase) && isSuccess)
            {
                return new { RspCode = "00", Message = "OK" };
            }

            transaction.Status = isSuccess ? "Paid" : "Failed";
            transaction.VnPayTransactionId = response.TransactionId;
            transaction.VnPayResponseCode = response.VnPayResponseCode;
            transaction.PaidAt = DateTime.UtcNow;
            transaction.Message = GetMessageFromResponseCode(response.VnPayResponseCode);
            transaction.BankCode = response.BankCode;
            transaction.IpnPayload = string.Join('&', collection.Select(kv => $"{kv.Key}={kv.Value}"));
            _paymentTransactionRepository.Update(transaction);
            await _paymentTransactionRepository.Commit();

            var order = await _orderRepository.FindByCondition(o => o.OrderId == orderId).FirstOrDefaultAsync();
            if (order != null)
            {
                // Chỉ cập nhật nếu chưa được xử lý (idempotent cho IPN)
                bool shouldUpdate = false;
                
                if (isSuccess && order.PaymentStatus != PaymentStatus.Paid)
                {
                    order.Status = OrderStatus.delivered; // Hoàn thành đơn hàng
                    order.PaymentStatus = PaymentStatus.Paid;
                    order.FulfillmentStatus = FulfillmentStatus.Delivered; // Đã giao hàng
                    shouldUpdate = true;
                }
                else if (!isSuccess && order.PaymentStatus == PaymentStatus.Pending)
                {
                    order.Status = OrderStatus.pending;
                    order.PaymentStatus = PaymentStatus.Failed;
                    shouldUpdate = true;
                }
                
                if (shouldUpdate)
                {
                    _orderRepository.Update(order);
                    await _orderRepository.Commit();
                }
            }

            return new { RspCode = "00", Message = "OK" };
        }

        private string GetMessageFromResponseCode(string code)
        {
            return code switch
            {
                "00" => "Giao dịch thành công",
                "07" => "Giao dịch bị nghi ngờ (liên hệ ngân hàng)",
                "09" => "Thẻ/Tài khoản chưa đăng ký InternetBanking",
                "10" => "Xác thực thông tin thẻ/tài khoản thất bại",
                "51" => "Tài khoản không đủ số dư",
                "65" => "Tài khoản bị khóa",
                _ => "Giao dịch thất bại"
            };
        }


    }
}