﻿using EcoFashionBackEnd.Common;
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

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ."));

            try
            {
                var result = await _userService.SignupAsync(request);
                return Ok(ApiResult<SignupResponse>.Succeed(result));
            }
            catch (BadRequestException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail(ex.Message));
            }
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOTP([FromBody] VerifyOTPRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ."));

            try
            {
                var result = await _userService.VerifyOTPAsync(request);
                if (result)
                {
                    return Ok(ApiResult<object>.Succeed("Xác thực OTP thành công."));
                }
                return BadRequest(ApiResult<object>.Fail("Xác thực OTP thất bại."));
            }
            catch (BadRequestException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail(ex.Message));
            }
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOTP([FromBody] ResendOTPRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResult<object>.Fail("Dữ liệu không hợp lệ."));

            try
            {
                var result = await _userService.ResendOTPAsync(request.Email);
                if (result)
                {
                    return Ok(ApiResult<object>.Succeed("Mã OTP đã được gửi lại."));
                }
                return BadRequest(ApiResult<object>.Fail("Không thể gửi lại mã OTP."));
            }
            catch (BadRequestException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail(ex.Message));
            }
        }
    }
}
