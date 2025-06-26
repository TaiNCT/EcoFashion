using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcoFashionBackEnd.Controllers
{
    [Route("api/[controller]")] // Định nghĩa route cho controller này, ví dụ: /api/Supplier
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierService _supplierService;

        public SupplierController(SupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet("GetAll")] // Định nghĩa route cho action này, ví dụ: /api/Supplier/GetAll
        public async Task<IActionResult> GetAllSuppliers()
        {
            var result = await _supplierService.GetAllSuppliers();
            return Ok(ApiResult<GetSuppliersResponse>.Succeed(new GetSuppliersResponse
            {
                Suppliers = result
            }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupplier([FromBody] CreateSupplierRequest request)
        {
            var supplierId = await _supplierService.CreateSupplier(request);
            return CreatedAtAction(nameof(GetSupplierById), new { id = supplierId }, ApiResult<Guid>.Succeed(supplierId));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplierById(Guid id)
        {
            var supplier = await _supplierService.GetSupplierById(id);
            if (supplier == null)
            {
                return NotFound(ApiResult<SupplierDetailResponse>.Fail("Không tìm thấy nhà cung cấp."));
            }
            return Ok(ApiResult<SupplierDetailResponse>.Succeed(new SupplierDetailResponse
            {
                Supplier = supplier
            }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier(Guid id, [FromBody] UpdateSupplierRequest request)
        {
            var isUpdated = await _supplierService.UpdateSupplier(id, request);
            if (!isUpdated)
            {
                return NotFound(ApiResult<object>.Fail("Không tìm thấy nhà cung cấp để cập nhật."));
            }
            return Ok(ApiResult<object>.Succeed("Cập nhật thông tin nhà cung cấp thành công."));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(Guid id)
        {
            var isDeleted = await _supplierService.DeleteSupplier(id);
            if (!isDeleted)
            {
                return NotFound(ApiResult<object>.Fail("Không tìm thấy nhà cung cấp để xóa."));
            }
            return Ok(ApiResult<object>.Succeed("Xóa (vô hiệu hóa) nhà cung cấp thành công."));
        }
        [HttpGet("Filter")]
        public async Task<IActionResult> FilterSuppliers(
    [FromQuery] string? supplierName,
    [FromQuery] string? email,
    [FromQuery] string? phoneNumber,
    [FromQuery] string? status)
        {
            var filteredSuppliers = await _supplierService.FilterSuppliers(supplierName, email, phoneNumber, status);
            return Ok(ApiResult<GetSuppliersResponse>.Succeed(new GetSuppliersResponse
            {
                Suppliers = filteredSuppliers
            }));
        }
        [HttpGet("Search")]
        public async Task<IActionResult> SearchSuppliers([FromQuery] string? keyword)
        {
            var searchResults = await _supplierService.SearchSuppliers(keyword);
            return Ok(ApiResult<GetSuppliersResponse>.Succeed(new GetSuppliersResponse
            {
                Suppliers = searchResults
            }));
        }



    }

}
