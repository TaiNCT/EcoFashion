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

        public async Task<LoginResult> LoginAsync(UserLoginRequest request)
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

            // Tạo security token và lưu vào đối tượng kết quả
            var securityToken = GenerateSecurityToken(user);
            var tokenHandler = new JwtSecurityTokenHandler();

            return new LoginResult
            {
                Authenticated = true,
                Message = "Đăng nhập thành công",
                UserId = user.UserId,
                IsMember = user.UserRole?.RoleName != "customer",
                Token = securityToken 
            };
        }

        private SecurityToken GenerateSecurityToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? "DefaultSecretKey123456789ABCDEFGHIJKLMNO");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.UserRole?.RoleName ?? "")
                }),
                Expires = DateTime.UtcNow.AddDays(7), // Token có hiệu lực 7 ngày
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.CreateToken(tokenDescriptor);
        }
        public async Task<UserModel?> GetUserById(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return _mapper.Map<UserModel>(user);
        }
    }
}
