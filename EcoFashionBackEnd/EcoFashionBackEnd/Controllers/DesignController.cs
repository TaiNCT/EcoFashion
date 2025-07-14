using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Services;

[Authorize] // Chỉ người dùng đã đăng nhập mới có thể truy cập
[Route("api/Design")]
[ApiController]
public class DesignController : ControllerBase
{
    private readonly DesignService _designService;
    private readonly DesignerService _designerService; // Inject DesignerService

    public DesignController(DesignService designService, DesignerService designerService)
    {
        _designService = designService;
        _designerService = designerService;
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAllDesigns()
    {
        var designs = await _designService.GetAllDesigns();
        return Ok(ApiResult<IEnumerable<DesignModel>>.Succeed(designs));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDesignById(int id)
    {
        var design = await _designService.GetDesignById(id);
        if (design == null) return NotFound(ApiResult<DesignModel>.Fail("Không tìm thấy thiết kế."));
        return Ok(ApiResult<DesignModel>.Succeed(design));
    }

    [HttpPost("Create")]
    public async Task<IActionResult> CreateDesign([FromBody] CreateDesignRequest request)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<int>.Fail("Không thể xác định người dùng."));
        }

        // Lấy DesignerId từ UserId
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue)
        {
            return BadRequest(ApiResult<int>.Fail("Người dùng này không phải là nhà thiết kế."));
        }

        var designId = await _designService.CreateDesign(request, designerId.Value);
        return CreatedAtAction(nameof(GetDesignById), new { id = designId }, ApiResult<int>.Succeed(designId));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDesign(int id, [FromBody] UpdateDesignRequest request)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
        }

        // Lấy DesignerId từ UserId
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue)
        {
            return BadRequest(ApiResult<DesignModel>.Fail("Người dùng này không phải là nhà thiết kế."));
        }

        var existingDesign = await _designService.GetDesignById(id);
        if (existingDesign == null)
        {
            return NotFound(ApiResult<object>.Fail("Không tìm thấy thiết kế để cập nhật."));
        }

        if (existingDesign.DesignerId != designerId.Value)
        {
            return Unauthorized(ApiResult<object>.Fail("Bạn không có quyền cập nhật thiết kế này."));
        }

        var updated = await _designService.UpdateDesign(id, request);
        if (updated)
            return Ok(ApiResult<object>.Succeed("Thiết kế đã được cập nhật."));
        return BadRequest(ApiResult<object>.Fail("Cập nhật thiết kế thất bại."));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDesign(int id)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
        }

        // Lấy DesignerId từ UserId
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue)
        {
            return BadRequest(ApiResult<DesignModel>.Fail("Người dùng này không phải là nhà thiết kế."));
        }

        var existingDesign = await _designService.GetDesignById(id);
        if (existingDesign == null)
        {
            return NotFound(ApiResult<object>.Fail("Không tìm thấy thiết kế để xóa."));
        }

        if (existingDesign.DesignerId != designerId.Value)
        {
            return Unauthorized(ApiResult<object>.Fail("Bạn không có quyền xóa thiết kế này."));
        }

        if (await _designService.DeleteDesign(id))
            return Ok(ApiResult<object>.Succeed("Thiết kế đã được xóa."));
        return BadRequest(ApiResult<object>.Fail("Xóa thiết kế thất bại."));
    }
}