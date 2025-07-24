using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Material;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Services
{
    public class BlogService
    {
        private readonly IRepository<Blog, int> _blogRepository;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        public BlogService(IRepository<Blog, int> blogRepository,
            AppDbContext context,
            IMapper mapper)
        {
            _blogRepository = blogRepository;
            _dbContext = context;
            _mapper = mapper;
        }
        public async Task<BlogModel?> GetBlogByIdAsync(int blogId)
        {
            var blog = await _blogRepository.GetByIdAsync(blogId);
            return _mapper.Map<BlogModel>(blog);
        }
        public async Task<BlogdDetailResponse?> GetBlogDetailByIdAsync(int blogId)
        {
            var blog = await _dbContext.Blogs
                .Include(b => b.Supplier)
                .Include(b => b.Material)
                .FirstOrDefaultAsync(b => b.BlogId == blogId);
            if (blog == null) return null;
            return new BlogdDetailResponse
            {
                BlogId = blog.BlogId,
                Supplier = _mapper.Map<SupplierPublicDto>(blog.Supplier),
                Material = _mapper.Map<MaterialDetailDto>(blog.Material),
                Title = blog.Title,
                Content = blog.Content,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt
            };
        }
        public async Task<IEnumerable<BlogdDetailResponse>> GetAllBlogsAsync()
        {
            var blogs = await _dbContext.Blogs
                .Include(b => b.Supplier)
                .Include(b => b.Material)
                .ToListAsync();
            return blogs.Select(blog => new BlogdDetailResponse
            {
                BlogId = blog.BlogId,
                Supplier = _mapper.Map<SupplierPublicDto>(blog.Supplier),
                Material = _mapper.Map<MaterialDetailDto>(blog.Material),
                Title = blog.Title,
                Content = blog.Content,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt
            }).ToList();
        }
        public async Task<CreateBlogResponse> CreateBlogAsync(int userId, CreateBlogRequest request)
        {
            var supplier = await GetSupplierOrThrowAsync(userId);
            var material = await _dbContext.Materials
                .FirstOrDefaultAsync(m => m.MaterialId == request.MaterialId);
            if (material == null)
                throw new ArgumentException("Vật liệu không tồn tại");
            var createdBlog = _mapper.Map<Blog>(request);
            createdBlog.SupplierId = supplier.SupplierId;
            await _blogRepository.AddAsync(createdBlog);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<CreateBlogResponse>(createdBlog);
        }
        public async Task<bool> UpdateBlogAsync(int blogId, int userId, UpdateBlogRequest request)
        {
            var supplier = await GetSupplierOrThrowAsync(userId);
            var blog = await _blogRepository.GetByIdAsync(blogId);
            if (blog == null)
                throw new ArgumentException("Blog không tồn tại");
            if (blog.SupplierId != supplier.SupplierId)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp của blog này");
            blog.Title = request.Title;
            blog.Content = request.Content;
            blog.UpdatedAt = DateTime.UtcNow;
            _blogRepository.Update(blog);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteBlogAsync(int blogId, int userId)
        {
            var supplier = await GetSupplierOrThrowAsync(userId);
            var blog = await _blogRepository.GetByIdAsync(blogId);
            if (blog == null)
                throw new ArgumentException("Blog không tồn tại");
            if (blog.SupplierId != supplier.SupplierId)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp của blog này");
            _blogRepository.Remove(blogId);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        private async Task<Supplier> GetSupplierOrThrowAsync(int userId)
        {
            var supplier = await _dbContext.Suppliers
                .FirstOrDefaultAsync(d => d.UserId == userId);

            if (supplier == null)
                throw new ArgumentException("Người dùng không phải là nhà cung cấp");

            return supplier;
        }
    }
}
