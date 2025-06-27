using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EcoFashionBackEnd.Dtos;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using EcoFashionBackEnd.Common.Payloads.Responses;

[Route("api/Applications")]
[ApiController]
public class ApplicationController : ControllerBase
{
    private readonly ApplicationService _applicationService;

    public ApplicationController(ApplicationService applicationService)
    {
        _applicationService = applicationService;
    }



    [HttpPost("ApplySupplier")]
    public async Task<IActionResult> ApplyAsSupplier([FromBody] ApplySupplierRequest request)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<ApplicationModel>.Fail("Không thể xác định người dùng."));
        }

        var application = await _applicationService.ApplyAsSupplier(userId, request);
        if (application != null)
        {
            return CreatedAtAction("GetApplicationById", new { id = application.ApplicationId }, ApiResult<ApplicationModel>.Succeed(application));
        }
        return BadRequest(ApiResult<object>.Fail("Không thể gửi đơn đăng ký trở thành nhà cung cấp."));
    }

    [HttpPost("ApplyDesigner")]
    public async Task<IActionResult> ApplyAsDesigner([FromBody] ApplyDesignerRequest request)
    {
        // Lấy UserId từ claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<ApplicationModel>.Fail("Không thể xác định người dùng."));
        }

        var application = await _applicationService.ApplyAsDesigner(userId, request);
        if (application != null)
        {
            return CreatedAtAction("GetApplicationById", new { id = application.ApplicationId }, ApiResult<ApplicationModel>.Succeed(application));
        }
        return BadRequest(ApiResult<object>.Fail("Không thể gửi đơn đăng ký trở thành nhà thiết kế."));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetApplicationById(int id)
    {
        var application = await _applicationService.GetApplicationById(id);
        if (application == null)
        {
            return NotFound(ApiResult<ApplicationModel>.Fail("Không tìm thấy đơn đăng ký."));
        }
        return Ok(ApiResult<ApplicationModel>.Succeed(application));
    }


    [HttpGet]
    public async Task<IActionResult> GetAllApplications()
    {
        var applications = await _applicationService.GetAllApplications();
        return Ok(ApiResult<IEnumerable<ApplicationModel>>.Succeed(applications));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{applicationId}/ApproveSupplier")]
    public async Task<IActionResult> ApproveSupplierApplication(int applicationId)
    {
        var isApproved = await _applicationService.ApproveSupplierApplication(applicationId);
        if (isApproved)
        {
            return Ok(ApiResult<object>.Succeed("Đơn đăng ký nhà cung cấp đã được phê duyệt và hồ sơ nhà cung cấp đã được tạo."));
        }
        return BadRequest(ApiResult<object>.Fail("Không thể phê duyệt đơn đăng ký nhà cung cấp hoặc đơn đăng ký không tồn tại."));
    }
    [Authorize(Roles = "Admin")]
    [HttpPut("{applicationId}/ApproveDesigner")]
    public async Task<IActionResult> ApproveDesignerApplication(int applicationId)
    {
        var isApproved = await _applicationService.ApproveDesignerApplication(applicationId);
        if (isApproved)
        {
            return Ok(ApiResult<object>.Succeed("Đơn đăng ký nhà thiết kế đã được phê duyệt và hồ sơ nhà thiết kế đã được tạo."));
        }
        return BadRequest(ApiResult<object>.Fail("Không thể phê duyệt đơn đăng ký nhà thiết kế hoặc đơn đăng ký không tồn tại."));
    }


    [Authorize(Roles = "Admin")]
    [HttpPut("{applicationId}/Reject")]
    public async Task<IActionResult> RejectApplication(int applicationId)
    {
        var isRejected = await _applicationService.RejectApplication(applicationId);
        if (isRejected)
        {
            return Ok(ApiResult<object>.Succeed("Đơn đăng ký đã bị từ chối."));
        }
        return BadRequest(ApiResult<object>.Fail("Không thể từ chối đơn đăng ký hoặc đơn đăng ký không tồn tại."));
    }

    [HttpGet("Filter")]
    public async Task<IActionResult> FilterApplications(
    [FromQuery] string? status, // Thay ApplicationStatus? bằng string?
    [FromQuery] int? targetRoleId,
    [FromQuery] DateTime? createdFrom,
    [FromQuery] DateTime? createdTo)
    {
        ApplicationStatus? parsedStatus = null;
        if (!string.IsNullOrEmpty(status) && Enum.TryParse<ApplicationStatus>(status, true, out var parsed))
        {
            parsedStatus = parsed;
        }
        else if (!string.IsNullOrEmpty(status))
        {
            ModelState.AddModelError("status", "Giá trị trạng thái không hợp lệ.");
            return BadRequest(ModelState);
        }

        var applications = await _applicationService.FilterApplications(parsedStatus, targetRoleId, createdFrom, createdTo);
        return Ok(ApiResult<GetApplicationsResponse>.Succeed(new GetApplicationsResponse
        {
            Applications = applications
        }));
    }

    [HttpGet("Search")]
    public async Task<IActionResult> SearchApplications([FromQuery] string? keyword)
    {
        var applications = await _applicationService.SearchApplications(keyword);
        return Ok(ApiResult<GetApplicationsResponse>.Succeed(new GetApplicationsResponse
        {
            Applications = applications
        }));
    }
}