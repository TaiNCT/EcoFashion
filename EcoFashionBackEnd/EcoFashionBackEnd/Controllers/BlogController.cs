using AutoMapper;
using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Material;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcoFashionBackEnd.Controllers
{
    [Route("api/Blog")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogService _blogService;
        private readonly IMapper _mapper;
        public BlogController(BlogService blogService, IMapper mapper)
        {
            _blogService = blogService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await _blogService.GetAllBlogsAsync();
            var response = _mapper.Map<IEnumerable<BlogdDetailResponse>>(blogs);
            return Ok(ApiResult<IEnumerable<BlogdDetailResponse>>.Succeed(response));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            var blog = await _blogService.GetBlogByIdAsync(id);
            if (blog == null) return NotFound(ApiResult<BlogModel>.Fail("Không tìm thấy blog."));
            return Ok(ApiResult<BlogModel>.Succeed(blog));
        }
        [HttpGet("Detail/{id}")]
        public async Task<IActionResult> GetBlogDetailById(int id)
        {
            var blogDetail = await _blogService.GetBlogDetailByIdAsync(id);
            if (blogDetail == null) return NotFound(ApiResult<BlogdDetailResponse>.Fail("Không tìm thấy chi tiết blog."));
            return Ok(ApiResult<BlogdDetailResponse>.Succeed(blogDetail));
        }
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody] CreateBlogRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim?.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var blog = await _blogService.CreateBlogAsync(userId, request);
                return CreatedAtAction(nameof(GetBlogById), new { id = blog.BlogId }, ApiResult<CreateBlogResponse>.Succeed(blog));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail($"Lỗi khi tạo blog: {ex.Message}"));
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] UpdateBlogRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim?.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                var blog = await _blogService.UpdateBlogAsync(id, userId, request);
                return Ok(ApiResult<string>.Succeed("Cập nhật blog thành công."));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail($"Lỗi khi cập nhật blog: {ex.Message}"));
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim?.Value, out int userId))
                return Unauthorized(ApiResult<object>.Fail("Không thể xác định người dùng."));
            try
            {
                await _blogService.DeleteBlogAsync(id, userId);
                return Ok(ApiResult<string>.Succeed("Xoá blog thành công."));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<object>.Fail($"Lỗi khi xoá blog: {ex.Message}"));
            }
        }
    }
}
