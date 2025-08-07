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

            var existingPendingTx = await _paymentTransactionRepository
                .FindByCondition(tx => tx.OrderId == model.OrderId && tx.Status == "Pending")
                .FirstOrDefaultAsync();

            PaymentTransaction transaction;

            if (existingPendingTx != null)
            {
                transaction = existingPendingTx;
            }
            else
            {
                transaction = new PaymentTransaction
                {
                    Id = Guid.NewGuid(),
                    OrderId = order.OrderId,
                    UserId = userId,
                    Amount = (long)model.Amount,
                    Status = "Pending",
                    OrderType = "Design",
                    PaymentType = "VNPay",
                    CreatedAt = DateTime.UtcNow
                };

                await _paymentTransactionRepository.AddAsync(transaction);
                await _paymentTransactionRepository.Commit();
            }

            // Truyền thêm TransactionId nếu cần để sau xử lý dễ
            return await _vnPayService.CreatePaymentUrlAsync(context, model);
        }





        public async Task<VnPaymentResponseModel> HandleVNPayReturnAsync(IQueryCollection collection)
        {
            var response = _vnPayService.PaymentExecute(collection);

            if (!int.TryParse(response.OrderId, out var orderId))
            {
                throw new Exception("Invalid OrderId in VNPay response");
            }

            var transaction = await _paymentTransactionRepository
                .FindByCondition(pt => pt.OrderId == orderId)
                .FirstOrDefaultAsync();

            if (transaction == null)
            {
                throw new Exception($"Transaction not found for OrderId: {orderId}");
            }

            transaction.Status = response.VnPayResponseCode == "00" ? "Paid" : "Failed";
            transaction.VnPayTransactionId = response.TransactionId;
            transaction.VnPayResponseCode = response.VnPayResponseCode;
            transaction.PaidAt = DateTime.UtcNow;
            transaction.Message = GetMessageFromResponseCode(response.VnPayResponseCode);
            transaction.BankCode = response.BankCode;
            _paymentTransactionRepository.Update(transaction);
            await _paymentTransactionRepository.Commit();

            var order = await _orderRepository.FindByCondition(o => o.OrderId == orderId)
                                                                .FirstOrDefaultAsync();

            if (order == null)
            {
                throw new Exception($"Order not found for OrderId: {orderId}");
            }

            if (response.VnPayResponseCode == "00")
            {
                order.Status = OrderStatus.processing;
            }
            else
            {
                order.Status = OrderStatus.pending; 
            }

            _orderRepository.Update(order);
            await _orderRepository.Commit();
            return response;
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