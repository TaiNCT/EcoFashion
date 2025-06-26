using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class DesignerService
{
    private readonly IRepository<Designer, Guid> _designerRepository;
    private readonly IRepository<Supplier, Guid> _supplierRepository;
    private readonly IMapper _mapper;
    private readonly AppDbContext _dbContext;

    public DesignerService(
        IRepository<Designer, Guid> designerRepository,
        IRepository<Supplier, Guid> supplierRepository,
        IMapper mapper,
        AppDbContext dbContext)
    {
        _designerRepository = designerRepository;
        _supplierRepository = supplierRepository;
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<DesignerModel>> GetAllDesigners()
    {
        var result = _designerRepository.GetAll().ToList();
        return _mapper.Map<List<DesignerModel>>(result);
    }

    public async Task<Guid> CreateDesigner(CreateDesignerRequest request)
    {
        var designer = new Designer
        {
            DesignerId = Guid.NewGuid(),
            UserId = request.UserId,
            DesignerName = request.DesignerName,
            PortfolioUrl = request.PortfolioUrl,
            BannerUrl = request.BannerUrl,
            SpecializationUrl = request.SpecializationUrl,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Address = request.Address,
            TaxNumber = request.TaxNumber,
            IdentificationNumber = request.IdentificationNumber,
            IdentificationPicture = request.IdentificationPicture,
            IdentificationPictureOwner = request.IdentificationPictureOwner,
            CreatedAt = DateTime.UtcNow,
            Status = "Active"
        };

        await _designerRepository.AddAsync(designer);
        var result = await _dbContext.SaveChangesAsync();

        if (result <= 0)
        {
            throw new InvalidOperationException("Failed to create new designer.");
        }

        return designer.DesignerId;
    }

    public async Task<DesignerModel?> GetDesignerById(Guid id)
    {
        var designer = await _designerRepository.GetByIdAsync(id);
        return _mapper.Map<DesignerModel>(designer);
    }

    public async Task<bool> UpdateDesigner(Guid id, UpdateDesignerRequest request)
    {
        var existingDesigner = await _designerRepository.GetByIdAsync(id);
        if (existingDesigner == null)
        {
            return false;
        }

        existingDesigner.DesignerName = request.DesignerName ?? existingDesigner.DesignerName;
        existingDesigner.PortfolioUrl = request.PortfolioUrl ?? existingDesigner.PortfolioUrl;
        existingDesigner.BannerUrl = request.BannerUrl ?? existingDesigner.BannerUrl;
        existingDesigner.SpecializationUrl = request.SpecializationUrl ?? existingDesigner.SpecializationUrl;
        existingDesigner.Email = request.Email ?? existingDesigner.Email;
        existingDesigner.PhoneNumber = request.PhoneNumber ?? existingDesigner.PhoneNumber;
        existingDesigner.Address = request.Address ?? existingDesigner.Address;
        existingDesigner.TaxNumber = request.TaxNumber ?? existingDesigner.TaxNumber;
        existingDesigner.IdentificationNumber = request.IdentificationNumber ?? existingDesigner.IdentificationNumber;
        existingDesigner.IdentificationPicture = request.IdentificationPicture ?? existingDesigner.IdentificationPicture;
        existingDesigner.IdentificationPictureOwner = request.IdentificationPictureOwner ?? existingDesigner.IdentificationPictureOwner;
        existingDesigner.UpdatedAt = DateTime.UtcNow;

        _designerRepository.Update(existingDesigner);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteDesigner(Guid id)
    {
        var existingDesigner = await _designerRepository.GetByIdAsync(id);
        if (existingDesigner == null)
        {
            return false;
        }

        existingDesigner.Status = "Inactive";
        existingDesigner.UpdatedAt = DateTime.UtcNow;
        _designerRepository.Update(existingDesigner);
        await _dbContext.SaveChangesAsync();
        return true;
    }
    public async Task<IEnumerable<DesignerModel>> FilterDesigners(string? designerName, string? email, string? phoneNumber, string? status)
    {
        var query = _designerRepository.GetAll();

        if (!string.IsNullOrEmpty(designerName))
        {
            query = query.Where(d => d.DesignerName == designerName);
        }
        if (!string.IsNullOrEmpty(email))
        {
            query = query.Where(d => d.Email == email);
        }
        if (!string.IsNullOrEmpty(phoneNumber))
        {
            query = query.Where(d => d.PhoneNumber == phoneNumber);
        }
        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(d => d.Status == status);
        }

        var result = await query.ToListAsync();
        return _mapper.Map<List<DesignerModel>>(result);
    }

    public async Task<IEnumerable<DesignerModel>> SearchDesigners(string? keyword)
    {
        if (string.IsNullOrEmpty(keyword))
        {
            return await GetAllDesigners(); // Hoặc trả về một danh sách rỗng
        }

        var query = _designerRepository.GetAll().Where(d =>
            (d.DesignerName != null && d.DesignerName.Contains(keyword, StringComparison.OrdinalIgnoreCase)) ||
            (d.Email != null && d.Email.Contains(keyword, StringComparison.OrdinalIgnoreCase)) ||
            (d.PhoneNumber != null && d.PhoneNumber.Contains(keyword, StringComparison.OrdinalIgnoreCase))
        );

        var result = await query.ToListAsync();
        return _mapper.Map<List<DesignerModel>>(result);
    }

    public async Task<FollowedSupplierResponse?> ConnectWithSupplier(Guid designerId, Guid supplierId)
    {
        // Kiểm tra xem designer và supplier có tồn tại không
        var designerExists = await _designerRepository.GetByIdAsync(designerId);
        var supplierExists = await _supplierRepository.GetByIdAsync(supplierId);

        if (designerExists == null || supplierExists == null)
        {
            return null; // Hoặc throw NotFoundException
        }

        // Kiểm tra xem liên kết đã tồn tại chưa
        var existingConnection = await _dbContext.SavedSuppliers
            .FirstOrDefaultAsync(s => s.DesignerId == designerId && s.SupplierId == supplierId);

        if (existingConnection != null)
        {
            return null; // Hoặc throw một exception cho biết đã tồn tại
        }

        // Tạo mới liên kết
        var savedSupplier = new SavedSupplier
        {
            DesignerId = designerId,
            SupplierId = supplierId
        };

        await _dbContext.SavedSuppliers.AddAsync(savedSupplier);
        var result = await _dbContext.SaveChangesAsync();

        if (result > 0)
        {
            // Lấy thông tin nhà cung cấp để trả về response giới hạn
            var supplier = await _supplierRepository.GetByIdAsync(supplierId);
            if (supplier != null)
            {
                return new FollowedSupplierResponse
                {
                    SupplierId = supplier.SupplierId,
                    SupplierName = supplier.SupplierName,
                    PortfolioUrl = supplier.PortfolioUrl
                };
            }
        }

        return null; // Lỗi khi tạo liên kết
    }
    public async Task<IEnumerable<SupplierModel>> GetFollowedSuppliers(Guid designerId)
    {
        var followedSupplierIds = await _dbContext.SavedSuppliers
            .Where(s => s.DesignerId == designerId)
            .Select(s => s.SupplierId)
            .ToListAsync();

        if (followedSupplierIds == null || !followedSupplierIds.Any())
        {
            return new List<SupplierModel>(); // Hoặc trả về null tùy theo yêu cầu
        }

        var suppliers = await _supplierRepository.FindByCondition(s => followedSupplierIds.Contains(s.SupplierId)).ToListAsync();
        return _mapper.Map<List<SupplierModel>>(suppliers);
    }

    public async Task<Guid?> GetDesignerIdByUserId(int userId)
    {
        var designer = await _dbContext.Designers
            .FirstOrDefaultAsync(d => d.UserId == userId);
        return designer?.DesignerId;
    }

    public async Task<bool> RemoveFollowedSupplier(Guid designerId, Guid supplierId)
    {
        var existingConnection = await _dbContext.SavedSuppliers
            .FirstOrDefaultAsync(s => s.DesignerId == designerId && s.SupplierId == supplierId);

        if (existingConnection == null)
        {
            return false; // Không tìm thấy liên kết để xóa
        }

        _dbContext.SavedSuppliers.Remove(existingConnection);
        var result = await _dbContext.SaveChangesAsync();

        return result > 0;
    }

}