﻿using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using EcoFashionBackEnd.Services;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
            PorfolioUrl = request.PorfolioUrl,
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
            PorfolioUrl = request.PorfolioUrl,
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

 
    public async Task<bool> ApproveSupplierApplication(int applicationId)
    {
        var application = await _applicationRepository.GetByIdAsync(applicationId);
        if (application == null || application.Status != ApplicationStatus.pending || application.TargetRoleId != 3)
        {
            return false;
        }

        var user = await _userService.GetUserById(application.UserId);
        if (user == null) return false;

        var supplier = new Supplier
        {
            SupplierId = Guid.NewGuid(),
            UserId = application.UserId,
            SupplierName = user.FullName, 
            PortfolioUrl = application.PorfolioUrl,
            BannerUrl = application.BannerUrl,
            SpecializationUrl = application.SpecializationUrl,
            IdentificationNumber = application.IdentificationNumber,
            IdentificationPicture = application.IdentificationPicture,
            IdentificationPictureOwner = "", 
            CreatedAt = DateTime.UtcNow,
            Status = "Active"
        };

        await _supplierRepository.AddAsync(supplier);
        user.RoleId = 3; // Cập nhật vai trò người dùng
        application.Status = ApplicationStatus.approved;

        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> ApproveDesignerApplication(int applicationId)
    {
        var application = await _applicationRepository.GetByIdAsync(applicationId);
        if (application == null || application.Status != ApplicationStatus.pending || application.TargetRoleId != 2)
        {
            return false;
        }

        var user = await _userService.GetUserById(application.UserId);
        if (user == null) return false;

        var designer = new Designer
        {
            DesignerId = Guid.NewGuid(),
            UserId = application.UserId,
            DesignerName = user.FullName, // Bạn có thể lấy từ Application hoặc User tùy theo
            PortfolioUrl = application.PorfolioUrl,
            BannerUrl = application.BannerUrl,
            SpecializationUrl = application.SpecializationUrl,
            IdentificationNumber = application.IdentificationNumber,
            IdentificationPicture = application.IdentificationPicture,
            IdentificationPictureOwner = "", 
            CreatedAt = DateTime.UtcNow,
            Status = "Active"
        };

        await _designerRepository.AddAsync(designer);
        user.RoleId = 2; // Cập nhật vai trò người dùng
        application.Status = ApplicationStatus.approved;

        return await _dbContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> RejectApplication(int applicationId)
    {
        var application = await _applicationRepository.GetByIdAsync(applicationId);
        if (application == null || application.Status != ApplicationStatus.pending)
        {
            return false;
        }

        application.Status = ApplicationStatus.rejected;
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
                    (a.IdentificationNumber != null && a.IdentificationNumber.ToLower().Contains(lowerKeyword)) ||
                    (a.Note != null && a.Note.ToLower().Contains(lowerKeyword)) ||
                    (a.User != null && (a.User.FullName != null && a.User.FullName.ToLower().Contains(lowerKeyword)) || (a.User.Email != null && a.User.Email.ToLower().Contains(lowerKeyword)) || (a.User.Username != null && a.User.Username.ToLower().Contains(lowerKeyword)))
                );
            }
        }

        var applications = await query.ToListAsync();
        return _mapper.Map<List<ApplicationModel>>(applications);
    }

}