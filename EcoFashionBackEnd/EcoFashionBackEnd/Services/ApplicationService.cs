using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using EcoFashionBackEnd.Services;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Text.Json;

namespace EcoFashionBackEnd.Services
{
    public class ApplicationService
    {
    private readonly IRepository<Application, int> _applicationRepository;
    private readonly IMapper _mapper;
    private readonly UserService _userService;
    private readonly AppDbContext _dbContext;
    private readonly IRepository<Supplier, Guid> _supplierRepository; 
    private readonly IRepository<Designer, Guid> _designerRepository;
    private readonly CloudService _cloudService;

        public ApplicationService(
        IRepository<Application, int> applicationRepository,
        IMapper mapper,
        UserService userService,
        AppDbContext dbContext,
        IRepository<Supplier, Guid> supplierRepository, 
        IRepository<Designer, Guid> designerRepository,
        CloudService cloudService) 
    {
        _applicationRepository = applicationRepository;
        _mapper = mapper;
        _userService = userService;
        _dbContext = dbContext;
        _supplierRepository = supplierRepository;
        _designerRepository = designerRepository;
        _cloudService = cloudService;
        }

        /// <summary>
        /// Upload single image file and return URL
        /// </summary>
        private async Task<string?> UploadSingleImageAsync(IFormFile? imageFile)
        {
            if (imageFile == null || imageFile.Length <= 0)
                return null;

            try
            {
                var uploadResult = await _cloudService.UploadImageAsync(imageFile);
                return uploadResult?.SecureUrl?.ToString();
            }
            catch (Exception)
            {
                // Log error but don't fail the entire application process
                return null; // Return null instead of throwing
            }
        }

        
        /// Upload multiple portfolio files and return JSON array of URLs
        private async Task<string?> UploadPortfolioFilesAsync(List<IFormFile>? portfolioFiles)
{
    if (portfolioFiles == null || portfolioFiles.Count == 0)
        return null;

    var uploadedUrls = new List<string>();

    foreach (var file in portfolioFiles)
    {
        if (file == null || file.Length == 0)
            continue;

        try
        {
            var uploadResult = await _cloudService.UploadImageAsync(file);
            if (!string.IsNullOrWhiteSpace(uploadResult?.SecureUrl?.ToString()))
            {
                uploadedUrls.Add(uploadResult.SecureUrl.ToString());
            }
        }
        catch (Exception)
        {
            // Ghi log nếu cần, hoặc dùng ILogger
            Console.WriteLine($"❌ Upload failed for file '{file.FileName}'");
            // Optional: continue; // đã mặc định
        }
    }

    return uploadedUrls.Count > 0
        ? JsonSerializer.Serialize(uploadedUrls)
        : null;
}
 
        private async Task<ApplicationModel> MapApplicationModelAsync(Application application)
        {
            var model = _mapper.Map<ApplicationModel>(application);
            if (application.ProcessedBy.HasValue)
            {
                model.ProcessedByUser = await _userService.GetUserById(application.ProcessedBy.Value);
            }
            return model;
        }

        public async Task<ApplicationModel?> ApplyAsSupplier(int userId, ApplySupplierRequest request, IFormFile? identificationPictureFile)
        {
            // Upload profile images
            var avatarUrl = await UploadSingleImageAsync(request.AvatarFile);
            var bannerUrl = await UploadSingleImageAsync(request.BannerFile);
            var portfolioFilesJson = await UploadPortfolioFilesAsync(request.PortfolioFiles);

            var application = new Application
            {
                UserId = userId,
                TargetRoleId = 3,
                AvatarUrl = avatarUrl,
                PortfolioUrl = request.PortfolioUrl,
                PortfolioFiles = portfolioFilesJson,
                BannerUrl = bannerUrl ?? request.BannerUrl,
                SpecializationUrl = request.SpecializationUrl,
                SocialLinks = request.SocialLinks,
                IdentificationNumber = request.IdentificationNumber,
                IdentificationPicture = null,
                IsIdentificationVerified = false,
                Note = request.Note,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                TaxNumber = request.TaxNumber,
                IdentificationPictureOwner = request.IdentificationPictureOwner,
                Certificates = request.Certificates
            };

            if (identificationPictureFile != null && identificationPictureFile.Length > 0)
            {
                try
                {
                    var uploadResult = await _cloudService.UploadImageAsync(identificationPictureFile);
                    if (uploadResult?.SecureUrl != null)
                    {
                        application.IdentificationPicture = uploadResult.SecureUrl.ToString();
                    }
                }
                catch (Exception)
                {
                    // Log error but don't fail the application
                }
            }

            await _applicationRepository.AddAsync(application);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0 ? _mapper.Map<ApplicationModel>(application) : null;
        }

        public async Task<ApplicationModel?> ApplyAsDesigner(int userId, ApplyDesignerRequest request, IFormFile? identificationPictureFile)
        {
            // Upload profile images
            var avatarUrl = await UploadSingleImageAsync(request.AvatarFile);
            var bannerUrl = await UploadSingleImageAsync(request.BannerFile);
            var portfolioFilesJson = await UploadPortfolioFilesAsync(request.PortfolioFiles);

            string? Normalize(string? value) => string.IsNullOrEmpty(value) ? null : value.Trim();

            var application = new Application
            {
                UserId = userId,
                TargetRoleId = 2,
                AvatarUrl = avatarUrl,
                PortfolioUrl = request.PortfolioUrl,
                PortfolioFiles = portfolioFilesJson,
                BannerUrl = bannerUrl ?? request.BannerUrl,
                SpecializationUrl = request.SpecializationUrl,
                SocialLinks = request.SocialLinks,
                IdentificationNumber = request.IdentificationNumber,
                IdentificationPicture = null,
                IsIdentificationVerified = false,
                Note = request.Note,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                TaxNumber = request.TaxNumber,
                IdentificationPictureOwner = request.IdentificationPictureOwner,
                Certificates = request.Certificates
            };

            if (identificationPictureFile != null && identificationPictureFile.Length > 0)
            {
                try
                {
                    var uploadResult = await _cloudService.UploadImageAsync(identificationPictureFile);
                    if (uploadResult?.SecureUrl != null)
                    {
                        application.IdentificationPicture = uploadResult.SecureUrl.ToString();
                    }
                }
                catch (Exception)
                {
                    // Log error but don't fail the application
                }
            }

            await _applicationRepository.AddAsync(application);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0 ? _mapper.Map<ApplicationModel>(application) : null;
        }

        public async Task<ApplicationModel?> GetApplicationById(int id)
        {
            var application = await _applicationRepository.GetByIdAsync(id);
            if (application == null) return null;
            return await MapApplicationModelAsync(application);
        }

        public async Task<IEnumerable<ApplicationModel>> GetAllApplications()
        {
            var applications = await _applicationRepository.GetAll()
                .Include(a => a.User)
                .Include(a => a.Role)
                .ToListAsync();
            var result = new List<ApplicationModel>();
            foreach (var app in applications)
            {
                result.Add(await MapApplicationModelAsync(app));
            }
            return result;
        }

 
    public async Task<bool> ApproveSupplierApplication(int applicationId, int adminId)
    {
        var application = await _applicationRepository.GetByIdAsync(applicationId);
        if (application == null || application.Status != ApplicationStatus.pending || application.TargetRoleId != 3)
        {
            return false;
        }

        // Lấy User entity trực tiếp từ database
        var user = await _dbContext.Users.FindAsync(application.UserId);
        if (user == null) return false;

        var supplier = new Supplier
        {
            SupplierId = Guid.NewGuid(),
            UserId = application.UserId,
            SupplierName = user.FullName,
            AvatarUrl = application.AvatarUrl,
            PortfolioUrl = application.PortfolioUrl,
            PortfolioFiles = application.PortfolioFiles,
            BannerUrl = application.BannerUrl,
            SpecializationUrl = application.SpecializationUrl,
            Bio = application.Note,
            Email = user.Email,
            PhoneNumber = application.PhoneNumber,
            Address = application.Address,
            TaxNumber = application.TaxNumber,
            IdentificationNumber = application.IdentificationNumber,
            IdentificationPicture = application.IdentificationPicture,
            IdentificationPictureOwner = application.IdentificationPictureOwner,
            Certificates = application.Certificates,
            CreatedAt = DateTime.UtcNow,
            Status = "Active"
        };

        await _supplierRepository.AddAsync(supplier);
        
        // Cập nhật vai trò người dùng
        user.RoleId = 3; // Supplier role
        _dbContext.Users.Update(user); // Cập nhật user trong database
        
        application.Status = ApplicationStatus.approved;
        application.ProcessedAt = DateTime.UtcNow;
        application.ProcessedBy = adminId;
        application.IsIdentificationVerified = true; // Mark as verified when approved
        // TODO: Send notification to user về approval
        // TODO: Send email confirmation

        return await _dbContext.SaveChangesAsync() > 0;
    }

   public async Task<bool> ApproveDesignerApplication(int applicationId, int adminId)
        {
            var application = await _applicationRepository.GetByIdAsync(applicationId);
            if (application == null || application.Status != ApplicationStatus.pending || application.TargetRoleId != 2)
            {
                return false;
            }

            // Lấy User entity trực tiếp từ database
            var user = await _dbContext.Users.FindAsync(application.UserId);
            if (user == null) return false;

            var designer = new Designer
            {
                DesignerId = Guid.NewGuid(),
                UserId = application.UserId,
                DesignerName = user.FullName,
                AvatarUrl = application.AvatarUrl,
                PortfolioUrl = application.PortfolioUrl,
                PortfolioFiles = application.PortfolioFiles,
                BannerUrl = application.BannerUrl,
                SpecializationUrl = application.SpecializationUrl,
                Bio = application.Note, // Nếu Application có trường Bio hoặc Note
                Email = user.Email,

                // Address ; TaxNumber ; Certificates ; IdentificationNumber ; IdentificationPicture ; IdentificationPictureOwner
                PhoneNumber = application.PhoneNumber,
                Address = application.Address,
                TaxNumber = application.TaxNumber,
                IdentificationPictureOwner = application.IdentificationPictureOwner,
                Certificates = application.Certificates,

                IdentificationNumber = application.IdentificationNumber,
                IdentificationPicture = application.IdentificationPicture,

                // Certificates = null, // Nếu Application có trường này thì lấy, không thì null
                CreatedAt = DateTime.UtcNow,
                Status = "Active"
            };

            await _designerRepository.AddAsync(designer);

            // Cập nhật vai trò người dùng
            user.RoleId = 2; // Designer role
            _dbContext.Users.Update(user); // Cập nhật user trong database

            application.Status = ApplicationStatus.approved;
            application.ProcessedAt = DateTime.UtcNow;
            application.ProcessedBy = adminId;
            application.IsIdentificationVerified = true; // Mark as verified when approved
                                                         // TODO: Send notification to user về approval
                                                         // TODO: Send email confirmation

            return await _dbContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> RejectApplication(int applicationId, int adminId, string rejectionReason)
        {
            var application = await _applicationRepository.GetByIdAsync(applicationId);
            if (application == null || application.Status != ApplicationStatus.pending)
            {
                return false;
            }

            application.Status = ApplicationStatus.rejected;
            application.ProcessedAt = DateTime.UtcNow;
            application.ProcessedBy = adminId;
            application.RejectionReason = rejectionReason;
            // TODO: Send notification to user về rejection với lý do
            // TODO: Send email notification

            return await _dbContext.SaveChangesAsync() > 0;
        }

    


    public async Task<IEnumerable<ApplicationModel>> FilterApplications(ApplicationStatus? status, int? targetRoleId, DateTime? createdFrom, DateTime? createdTo)
    {
        var query = _dbContext.Set<Application>()
            .Include(a => a.User)
            .Include(a => a.Role)
            .AsQueryable(); // Thêm AsQueryable() để đảm bảo kiểu

        if (status.HasValue)
        {
            query = query.Where(a => a.Status == status.Value);
        }

        if (targetRoleId.HasValue)
        {
            query = query.Where(a => a.TargetRoleId == targetRoleId.Value);
        }

        if (createdFrom.HasValue)
        {
            query = query.Where(a => a.CreatedAt >= createdFrom.Value);
        }

        if (createdTo.HasValue)
        {
            query = query.Where(a => a.CreatedAt <= createdTo.Value);
        }

        var applications = await query.ToListAsync();
        return _mapper.Map<List<ApplicationModel>>(applications);
    }

    public async Task<IEnumerable<ApplicationModel>> SearchApplications(string? keyword)
    {
        var query = _dbContext.Set<Application>()
            .Include(a => a.User)
            .Include(a => a.Role)
            .AsQueryable();

        if (!string.IsNullOrEmpty(keyword))
        {
            var lowerKeyword = keyword.ToLower();
            if (int.TryParse(keyword, out int userId))
            {
                query = query.Where(a => a.UserId == userId);
            }
            else
            {
            query = query.Where(a =>
                (!string.IsNullOrEmpty(a.IdentificationNumber) && a.IdentificationNumber.ToLower().Contains(lowerKeyword)) ||
                (!string.IsNullOrEmpty(a.Note) && a.Note.ToLower().Contains(lowerKeyword)) ||
                (a.User != null && (
                    (!string.IsNullOrEmpty(a.User.FullName) && a.User.FullName.ToLower().Contains(lowerKeyword)) || 
                    (!string.IsNullOrEmpty(a.User.Email) && a.User.Email.ToLower().Contains(lowerKeyword)) || 
                    (!string.IsNullOrEmpty(a.User.Username) && a.User.Username.ToLower().Contains(lowerKeyword))
                ))
            );
            }
        }

        var applications = await query.ToListAsync();
        return _mapper.Map<List<ApplicationModel>>(applications);
    }

    public async Task<IEnumerable<ApplicationModel>> GetApplicationsByUserId(int userId)
    {
        var applications = await _dbContext.Set<Application>()
            .Include(a => a.User)
            .Include(a => a.Role)
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<ApplicationModel>>(applications);
    }

}
}