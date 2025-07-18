using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcoFashionBackEnd.Controllers
{
    [Route("api/Materials")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly MaterialService _materialService;
        public MaterialController(MaterialService materialService)
        {
            _materialService = materialService;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterialById(int id)
        {
            var material = await _materialService.GetMaterialByIdAsync(id);
            if (material == null)
                return NotFound(ApiResult<MaterialModel>.Fail("Không tìm thấy vật liệu"));

            return Ok(ApiResult<MaterialModel>.Succeed(material));
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMaterials()
        {
            try
            {
                var materials = await _materialService.GetAllMaterialsAsync();
                return Ok(ApiResult<List<MaterialModel>>.Succeed(materials.ToList()));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi lấy danh sách vật liệu: {ex.Message}"));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateMaterial([FromBody] MaterialRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ"));
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var material = await _materialService.CreateMaterialAsync(userId, request);
                return Ok(ApiResult<MaterialModel>.Succeed(material));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500,ApiResult<object>.Fail("Lỗi hệ thống: " + ex.Message));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaterial(int id, [FromBody] MaterialRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ"));
            if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var material = await _materialService.UpdateMaterialAsync(userId, id, model);
                if (material == null)
                    return NotFound(ApiResult<object>.Fail("Không tìm thấy vật liệu cần cập nhật"));

                return Ok(ApiResult<MaterialModel>.Succeed(material));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail("Lỗi hệ thống: " + ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var isDeleted = await _materialService.DeleteMaterialAsync(userId, id);
                if (!isDeleted)
                    return NotFound(ApiResult<object>.Fail("Không tìm thấy vật liệu cần xóa"));

                return Ok(ApiResult<object>.Succeed("Xóa vật liệu thành công"));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail("Lỗi hệ thống: " + ex.Message));
            }
        }
    }
}
