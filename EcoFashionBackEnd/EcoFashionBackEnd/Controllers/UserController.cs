using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Dtos.Auth;
using EcoFashionBackEnd.Dtos.User;
using EcoFashionBackEnd.Exceptions;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcoFashionBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ."));

            try
            {
                // Gọi service để xác thực user
                var result = await _userService.LoginAsync(request);
                return Ok(ApiResult<AuthResponse>.Succeed(result));
            }
            catch (BadRequestException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                // Log exception
                return StatusCode(500, ApiResult<object>.Fail(ex.Message));
            }
        }
    }
}
