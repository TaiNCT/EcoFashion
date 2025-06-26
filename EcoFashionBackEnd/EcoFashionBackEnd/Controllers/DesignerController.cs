using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Common;

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

}