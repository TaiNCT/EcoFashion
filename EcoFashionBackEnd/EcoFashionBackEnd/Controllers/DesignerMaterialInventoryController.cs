using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Dtos.DesignerMaterialInventory;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcoFashionBackEnd.Controllers
{
    [Route("api/DesignerMaterialInventories")]
    [ApiController]
    public class DesignerMaterialInventoryController : ControllerBase
    {
        private readonly DeveloperMaterialInventoryService _inventoryService;

        public DesignerMaterialInventoryController(DeveloperMaterialInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDesignerMaterialInventories()
        {
            try
            {
                var inventories = await _inventoryService.GetAllDesignerMaterialInventoriesAsync();
                return Ok(ApiResult<List<DesignerMaterialInventoryModel>>.Succeed(inventories.ToList()));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi lấy danh sách kho vật liệu: {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDesignerMaterialInventoryById(int id)
        {
            var inventory = await _inventoryService.GetDesignerMaterialInventoryByIdAsync(id);
            if (inventory == null)
                return NotFound(ApiResult<DesignerMaterialInventoryModel>.Fail("Không tìm thấy kho vật liệu"));
            return Ok(ApiResult<DesignerMaterialInventoryModel>.Succeed(inventory));
        }
        [HttpPost]
        public async Task<IActionResult> CreateDesignerMaterialInventory([FromBody] DesignerMaterialInventoryRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ"));
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim?.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var inventory = await _inventoryService.CreateDesignerMaterialInventoryAsync(userId, request);
                return Ok(ApiResult<DesignerMaterialInventoryModel>.Succeed(inventory));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi tạo kho vật liệu: {ex.Message}"));
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDesignerMaterialInventory(int id, int quantity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ"));
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim?.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var updatedInventory = await _inventoryService.UpdateDesignerMaterialInventoryAsync(userId, id, quantity);
                if (updatedInventory == null)
                    return NotFound(ApiResult<DesignerMaterialInventoryModel>.Fail("Không tìm thấy kho vật liệu để cập nhật"));
                return Ok(ApiResult<DesignerMaterialInventoryModel>.Succeed(updatedInventory));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi cập nhật kho vật liệu: {ex.Message}"));
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesignerMaterialInventory(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim?.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var isDeleted = await _inventoryService.DeleteDesignerMaterialInventoryAsync(userId, id);
                if (!isDeleted)
                    return NotFound(ApiResult<object>.Fail("Không tìm thấy kho vật liệu để xóa"));
                return Ok(ApiResult<object>.Succeed("Xóa kho vật liệu thành công"));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail($"Lỗi khi xóa kho vật liệu: {ex.Message}"));
            }
        }
    }
}
