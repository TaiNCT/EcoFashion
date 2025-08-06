using EcoFashionBackEnd.Dtos;

namespace EcoFashionBackEnd.Extensions.NewFolder
{
   
    public interface IVnPayService
    {
        string CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model);
        VnPaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}
