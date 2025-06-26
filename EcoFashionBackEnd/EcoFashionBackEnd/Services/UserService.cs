using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Auth;
using EcoFashionBackEnd.Dtos.User;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Exceptions;
using EcoFashionBackEnd.Helpers;
using EcoFashionBackEnd.Repositories;
using Microsoft.IdentityModel.Tokens;
using EcoFashionBackEnd.Settings;
using Microsoft.AspNetCore.Http.HttpResults;

namespace EcoFashionBackEnd.Services
{
    public class UserService
    {
        private readonly IRepository<User, int> _userRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<UserRole, int> _userRoleRepository;
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(
            IRepository<User, int> userRepository,
            IMapper mapper,
            IRepository<UserRole, int> userRoleRepository,
            AppDbContext dbContext,
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userRoleRepository = userRoleRepository;
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<AuthResponse> LoginAsync(UserLoginRequest request)
        {
            // Tìm user theo email
            var user = await _dbContext.Users
                .Include(u => u.UserRole)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                throw new UserNotFoundException("Tài khoản không tồn tại.");
            }

            // Kiểm tra mật khẩu (so sánh hash)
            if (user.PasswordHash != SecurityUtil.Hash(request.PasswordHash))
            {
                throw new BadRequestException("Mật khẩu không chính xác.");
            }

            // Kiểm tra trạng thái tài khoản
            if (user.Status != UserStatus.Active)
            {
                throw new BadRequestException("Tài khoản không hoạt động.");
            }

            IConfiguration configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();
            
            var expiresAt = DateTime.Now.AddDays(7);
            var jwtKey = configuration["JwtSettings:Key"] ?? throw new InvalidOperationException("JWT Key not configured");
            var token = user.GenerateJsonWebToken(jwtKey, DateTime.Now);
            
            var response = new AuthResponse
            {
                Token = token,
                ExpiresAt = expiresAt,
                User = new UserInfo
                {
                    UserId = user.UserId,
                    FullName = user.FullName ?? "",
                    Email = user.Email ?? "",
                    Phone = user.Phone,
                    Username = user.Username,
                    Role = user.UserRole?.RoleName ?? "",
                    RoleId = user.RoleId,
                    Status = user.Status.ToString(),
                    CreatedAt = user.CreatedAt
                }
            };

            return response;     
        }     
    }
}
