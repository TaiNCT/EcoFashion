using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Common;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using EcoFashionBackEnd.Services;

[Route("api/[controller]")]
[ApiController]
public class DesignerController : ControllerBase
{
    private readonly DesignerService _designerService;

    public DesignerController(DesignerService designerService)
    {
        _designerService = designerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllDesigners()
    {
        var result = await _designerService.GetAllDesigners();
        return Ok(ApiResult<GetDesignersResponse>.Succeed(new GetDesignersResponse
        {
            Designers = result
        }));
    }

    [HttpPost]
    public async Task<IActionResult> CreateDesigner([FromBody] CreateDesignerRequest request)
    {
        var designerId = await _designerService.CreateDesigner(request);
        return CreatedAtAction(nameof(GetDesignerById), new { id = designerId }, ApiResult<Guid>.Succeed(designerId));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDesignerById(Guid id)
    {
        var designer = await _designerService.GetDesignerById(id);
        if (designer == null)
        {
            return NotFound(ApiResult<DesignerDetailResponse>.Fail("Không tìm thấy nhà thiết kế."));
        }
        return Ok(ApiResult<DesignerDetailResponse>.Succeed(new DesignerDetailResponse
        {
            Designer = designer
        }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDesigner(Guid id, [FromBody] UpdateDesignerRequest request)
    {
        var isUpdated = await _designerService.UpdateDesigner(id, request);
        if (!isUpdated)
        {
            return NotFound(ApiResult<object>.Fail("Không tìm thấy nhà thiết kế để cập nhật."));
        }
        return Ok(ApiResult<object>.Succeed("Cập nhật thông tin nhà thiết kế thành công."));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDesigner(Guid id)
    {
        var isDeleted = await _designerService.DeleteDesigner(id);
        if (!isDeleted)
        {
            return NotFound(ApiResult<object>.Fail("Không tìm thấy nhà thiết kế để xóa."));
        }
        return Ok(ApiResult<object>.Succeed("Xóa nhà thiết kế thành công."));
    }
    [HttpGet("Filter")]
    public async Task<IActionResult> FilterDesigners(
    [FromQuery] string? designerName,
    [FromQuery] string? email,
    [FromQuery] string? phoneNumber,
    [FromQuery] string? status)
    {
        var filteredDesigners = await _designerService.FilterDesigners(designerName, email, phoneNumber, status);
        return Ok(ApiResult<GetDesignersResponse>.Succeed(new GetDesignersResponse
        {
            Designers = filteredDesigners
        }));
    }
    [HttpGet("Search")]
    public async Task<IActionResult> SearchDesigners([FromQuery] string? keyword)
    {
        var searchResults = await _designerService.SearchDesigners(keyword);
        return Ok(ApiResult<GetDesignersResponse>.Succeed(new GetDesignersResponse
        {
            Designers = searchResults
        }));
    }
    
    [Authorize]
    [HttpPost("follow/{supplierId}")]
    public async Task<IActionResult> ConnectWithSupplier(Guid supplierId)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<GetSuppliersResponse>.Fail("Không thể xác định người dùng."));
        }

       
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue) 
        {
            return NotFound(ApiResult<GetSuppliersResponse>.Fail("Không tìm thấy thông tin nhà thiết kế cho người dùng này."));
        }

        var result = await _designerService.ConnectWithSupplier(designerId.Value, supplierId);

        if (result == null)
        {
            return BadRequest(ApiResult<FollowedSupplierResponse>.Fail("Không thể kết nối hoặc nhà cung cấp đã được theo dõi."));
        }

        return Ok(ApiResult<FollowedSupplierResponse>.Succeed(result));
    }

    [Authorize]
    [HttpGet("follow")]
    public async Task<IActionResult> GetFollowedSuppliers()
    {
        // Lấy UserId từ claims 
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<GetSuppliersResponse>.Fail("Không thể xác định người dùng."));
        }

        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (designerId == null)
        {
            return NotFound(ApiResult<GetSuppliersResponse>.Fail("Không tìm thấy thông tin nhà thiết kế cho người dùng này."));
        }

        var followedSuppliers = await _designerService.GetFollowedSuppliers(designerId.Value);
        return Ok(ApiResult<GetSuppliersResponse>.Succeed(new GetSuppliersResponse
        {
            Suppliers = followedSuppliers
        }));
    }

    [HttpDelete("follow/{supplierId}")]
    public async Task<IActionResult> RemoveFollowedSupplier(Guid supplierId)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
        }

        // Lấy designerId từ UserId
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue)
        {
            return NotFound(ApiResult<object>.Fail("Không tìm thấy thông tin nhà thiết kế cho người dùng này."));
        }

        var isDeleted = await _designerService.RemoveFollowedSupplier(designerId.Value, supplierId);

        if (isDeleted)
        {
            return Ok(ApiResult<object>.Succeed("Xóa liên kết thành công.")); 
        }
        else
        {
            return NotFound(ApiResult<object>.Fail("Không tìm thấy liên kết giữa nhà thiết kế và nhà cung cấp này."));
        }
    }

    // feature: Lấy thông tin profile của Designer đã đăng nhập
    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetMyDesignerProfile()
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<DesignerDetailResponse>.Fail("Không thể xác định người dùng."));
        }

        // Lấy designerId từ UserId
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue)
        {
            return NotFound(ApiResult<DesignerDetailResponse>.Fail("Bạn chưa có profile Designer. Vui lòng liên hệ admin để tạo profile."));
        }

        var designer = await _designerService.GetDesignerById(designerId.Value);
        if (designer == null)
        {
            return NotFound(ApiResult<DesignerDetailResponse>.Fail("Không tìm thấy thông tin nhà thiết kế."));
        }

        return Ok(ApiResult<DesignerDetailResponse>.Succeed(new DesignerDetailResponse
        {
            Designer = designer
        }));
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateMyDesignerProfile([FromBody] UpdateDesignerRequest request)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<DesignerDetailResponse>.Fail("Không thể xác định người dùng."));
        }

        // Lấy designerId từ UserId
        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (!designerId.HasValue)
        {
            return NotFound(ApiResult<DesignerDetailResponse>.Fail("Bạn chưa có profile Designer. Vui lòng liên hệ admin để tạo profile."));
        }

        var isUpdated = await _designerService.UpdateDesigner(designerId.Value, request);
        if (!isUpdated)
        {
            return BadRequest(ApiResult<object>.Fail("Không thể cập nhật thông tin nhà thiết kế."));
        }

        // Lấy thông tin designer sau khi update
        var updatedDesigner = await _designerService.GetDesignerById(designerId.Value);
        return Ok(ApiResult<DesignerDetailResponse>.Succeed(new DesignerDetailResponse
        {
            Designer = updatedDesigner
        }));
    }

}