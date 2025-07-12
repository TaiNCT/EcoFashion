using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Dtos.Material;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;

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

            try
            {
                var material = await _materialService.CreateMaterialAsync(request);
                return Ok(ApiResult<MaterialModel>.Succeed(material));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi tạo vật liệu: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaterial(int id, [FromBody] MaterialRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ"));

            try
            {
                var material = await _materialService.UpdateMaterialAsync(id, model);
                if (material == null)
                    return NotFound(ApiResult<object>.Fail("Không tìm thấy vật liệu cần cập nhật"));

                return Ok(ApiResult<MaterialModel>.Succeed(material));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi cập nhật vật liệu: {ex.Message}"));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            try
            {
                var deleted = await _materialService.DeleteMaterialAsync(id);
                if (!deleted)
                    return NotFound(ApiResult<object>.Fail("Không tìm thấy vật liệu cần xóa"));

                return Ok(ApiResult<object>.Succeed("Xóa vật liệu thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi xóa vật liệu: {ex.Message}"));
            }
        }
    }
}
