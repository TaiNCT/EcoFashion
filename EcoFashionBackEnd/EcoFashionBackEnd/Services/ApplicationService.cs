using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using EcoFashionBackEnd.Services;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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


    public ApplicationService(
        IRepository<Application, int> applicationRepository,
        IMapper mapper,
        UserService userService,
        AppDbContext dbContext,
        IRepository<Supplier, Guid> supplierRepository, 
        IRepository<Designer, Guid> designerRepository) 
    {
        _applicationRepository = applicationRepository;
        _mapper = mapper;
        _userService = userService;
        _dbContext = dbContext;
        _supplierRepository = supplierRepository;
        _designerRepository = designerRepository;
    }



    public async Task<ApplicationModel?> ApplyAsSupplier(int userId, ApplySupplierRequest request)
    {
        var application = new Application
        {
            UserId = userId,
            TargetRoleId = 3,
            PortfolioUrl = request.PortfolioUrl,
            BannerUrl = request.BannerUrl,
            SpecializationUrl = request.SpecializationUrl,
            IdentificationNumber = request.IdentificationNumber,
            IdentificationPicture = request.IdentificationPicture,
            Note = request.Note
        };

        await _applicationRepository.AddAsync(application);
        var result = await _dbContext.SaveChangesAsync();
        return result > 0 ? _mapper.Map<ApplicationModel>(application) : null;
    }

    public async Task<ApplicationModel?> ApplyAsDesigner(int userId, ApplyDesignerRequest request)
    {
        var application = new Application
        {
            UserId = userId,
            TargetRoleId = 2,
            PortfolioUrl = request.PortfolioUrl,
            BannerUrl = request.BannerUrl,
            SpecializationUrl = request.SpecializationUrl,
            IdentificationNumber = request.IdentificationNumber,
            IdentificationPicture = request.IdentificationPicture,
            Note = request.Note
        };

        await _applicationRepository.AddAsync(application);
        var result = await _dbContext.SaveChangesAsync();
        return result > 0 ? _mapper.Map<ApplicationModel>(application) : null;
    }

    public async Task<ApplicationModel?> GetApplicationById(int id)
    {
        var application = await _applicationRepository.GetByIdAsync(id);
        return _mapper.Map<ApplicationModel>(application);
    }

    public async Task<IEnumerable<ApplicationModel>> GetAllApplications()
    {
        var applications = await _applicationRepository.GetAll()
            .Include(a => a.User)
            .Include(a => a.Role)
            .ToListAsync();
        return _mapper.Map<List<ApplicationModel>>(applications);
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
            PortfolioUrl = application.PortfolioUrl,
            BannerUrl = application.BannerUrl,
            SpecializationUrl = application.SpecializationUrl,
            IdentificationNumber = application.IdentificationNumber,
            IdentificationPicture = application.IdentificationPicture,
            IdentificationPictureOwner = "", 
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
            DesignerName = user.FullName, // Bạn có thể lấy từ Application hoặc User tùy theo
            PortfolioUrl = application.PortfolioUrl,
            BannerUrl = application.BannerUrl,
            SpecializationUrl = application.SpecializationUrl,
            IdentificationNumber = application.IdentificationNumber,
            IdentificationPicture = application.IdentificationPicture,
            IdentificationPictureOwner = "", 
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