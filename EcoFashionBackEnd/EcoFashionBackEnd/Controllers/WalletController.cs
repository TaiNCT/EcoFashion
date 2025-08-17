namespace EcoFashionBackEnd.Controllers
{
    using EcoFashionBackEnd.Common;
    using EcoFashionBackEnd.Common.Payloads.Requests.Wallet;
    using EcoFashionBackEnd.Entities;
    using EcoFashionBackEnd.Extensions.NewFolder;
    using EcoFashionBackEnd.Services;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using System.Transactions;

    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly WalletService _walletService;

        public WalletController(WalletService walletService)
        {
            _walletService = walletService;
        }

        // ============================
        // 1️⃣ Lấy số dư ví
        // ============================
        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized("Không thể xác định người dùng.");

            var balance = await _walletService.GetBalanceAsync(userId);
            return Ok(new { UserId = userId, Balance = balance });
        }

        // ============================
        // 2️⃣ Lấy lịch sử giao dịch ví
        // ============================
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized("Không thể xác định người dùng.");

            var transactions = await _walletService.GetTransactionsAsync(userId);
            return Ok(transactions);
        }

        // 3️⃣ Tạo link nạp tiền (VNPay)
        [HttpPost("deposit")]
        public async Task<IActionResult> CreateDepositLink([FromBody] DepositRequest request)
        {
            if (request.Amount <= 0)
                return BadRequest("Số tiền nạp phải > 0");

            // Xác định userId từ token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized("Không thể xác định người dùng.");

            // 1️⃣ Tạo transaction pending trong DB
            // 2️⃣ Build VNPay model và tạo link
            var result = await _walletService.CreateDepositAsync(userId, request.Amount, HttpContext);

            // 3️⃣ Trả link về FE
            return Ok(result);
        }

        // 4️⃣ Callback VNPay (server-to-server)
        [AllowAnonymous]
        [HttpGet("deposit/callback")]
        public async Task<IActionResult> DepositCallback()
        {
            // 1️⃣ VNPay gọi GET với query vnp_*
            var query = HttpContext.Request.Query;

            // 2️⃣ Handle callback: update PaymentTransaction + WalletTransaction
            var result = await _walletService.HandleVNPayDepositReturnAsync(query);

            // 3️⃣ FE có thể đọc từ DB hoặc redirect tùy muốn
            if (result == null)
                return BadRequest("Xử lý nạp tiền thất bại.");

            return Ok(new
            {
                Status = result.VnPayResponseCode == "00" ? "Success" : "Fail",
                TransactionId = result.TransactionId,
                OrderId = result.OrderId
            });
        }
    }




}
