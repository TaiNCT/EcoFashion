using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Extensions.NewFolder;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcoFashionBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _paymentService;

        public PaymentsController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-vnpay")]
        public async Task<IActionResult> CreateVNPayPayment([FromBody] VnPaymentRequestModel model)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không xác định được người dùng."));

            var url = await _paymentService.CreateVNPayUrlAsync(HttpContext, model, userId);
            return Ok(new { redirectUrl = url });
        }

        [HttpGet("/Checkout/PaymentCallbackVnpay")]
        public async Task<IActionResult> VNPayReturn()
        {
            var result = await _paymentService.HandleVNPayReturnAsync(Request.Query);
            return Ok(result);
        }
    }
}
