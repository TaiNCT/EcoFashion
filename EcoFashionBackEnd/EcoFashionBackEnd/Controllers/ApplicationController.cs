using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EcoFashionBackEnd.Dtos;

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
        var application = await _applicationService.ApplyAsSupplier(request);
        if (application != null)
        {
            return CreatedAtAction("GetApplicationById", new { id = application.ApplicationId }, ApiResult<ApplicationModel>.Succeed(application));
        }
        return BadRequest(ApiResult<object>.Fail("Không thể gửi đơn đăng ký trở thành nhà cung cấp."));
    }

    [HttpPost("ApplyDesigner")]
    public async Task<IActionResult> ApplyAsDesigner([FromBody] ApplyDesignerRequest request)
    {
        var application = await _applicationService.ApplyAsDesigner(request);
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
}