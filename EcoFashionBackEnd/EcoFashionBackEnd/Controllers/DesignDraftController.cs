using AutoMapper;
using Azure;
using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Requests.DessignDraft;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Design;
using EcoFashionBackEnd.Services;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace EcoFashionBackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DesignDraftController : ControllerBase
{
    private readonly DesignDraftService _designDraftService;
    private readonly DesignerService _designerService;

    public DesignDraftController(DesignDraftService designDraftService, DesignerService designerService)
    {
        _designDraftService = designDraftService;
        _designerService = designerService;
    }

    [HttpPost("create-draft")]
    public async Task<ActionResult<ApiResult<int>>> CreateDraft([FromForm] DraftDesignCreateRequest request)
    {
        // Lấy userId từ claim
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized(ApiResult<int>.Fail("Không thể xác định người dùng."));
        }

        var designerId = await _designerService.GetDesignerIdByUserId(userId);
        if (designerId == Guid.Empty)
        {
            return BadRequest(ApiResult<int>.Fail("Không tìm thấy Designer tương ứng."));
        }

        try
        {
            var designId = await _designDraftService.CreateDraftDesignAsync(request, (Guid)designerId);
            return Ok(ApiResult<int>.Succeed(designId));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResult<object>.Fail(ex));
        }
    }
}
