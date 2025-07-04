﻿using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Exceptions;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Services
{
    public class SupplierService
    {
        private readonly IRepository<Supplier, Guid> _supplierRepository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext; // Assuming you have AppDbContext

        public SupplierService(
            IRepository<Supplier, Guid> supplierRepository,
            IMapper mapper,
            AppDbContext dbContext)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<SupplierModel>> GetAllSuppliers()
        {
            var result = _supplierRepository.GetAll().ToList();
            return _mapper.Map<List<SupplierModel>>(result);
        }

        public async Task<Guid> CreateSupplier(CreateSupplierRequest request)
        {
            // Thêm validation (ví dụ: kiểm tra UserId có tồn tại)
            //var userExists = await _userRepository.GetByIdAsync(request.UserId);
            //if (userExists == null)
            //{
            //    throw new BadRequestException("Invalid User ID"); // Giả sử bạn có BadRequestException
            //}

            var supplier = new Supplier
            {
                SupplierId = Guid.NewGuid(),
                UserId = request.UserId,
                SupplierName = request.SupplierName,
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

            await _supplierRepository.AddAsync(supplier);
            var result = await _dbContext.SaveChangesAsync(); // Hoặc _supplierRepository.Commit() nếu bạn có

            if (result <= 0)
            {
                throw new InvalidOperationException("Failed to create new supplier.");
            }

            return supplier.SupplierId;
        }

        public async Task<SupplierModel?> GetSupplierById(Guid id)
        {
            var supplier = await _supplierRepository.GetByIdAsync(id);
            return _mapper.Map<SupplierModel>(supplier);
        }

        public async Task<bool> UpdateSupplier(Guid id, UpdateSupplierRequest request)
        {
            var existingSupplier = await _supplierRepository.GetByIdAsync(id);
            if (existingSupplier == null)
            {
                return false;
            }

            existingSupplier.SupplierName = request.SupplierName ?? existingSupplier.SupplierName;
            existingSupplier.PortfolioUrl = request.PortfolioUrl ?? existingSupplier.PortfolioUrl;
            existingSupplier.BannerUrl = request.BannerUrl ?? existingSupplier.BannerUrl;
            existingSupplier.SpecializationUrl = request.SpecializationUrl ?? existingSupplier.SpecializationUrl;
            existingSupplier.Email = request.Email ?? existingSupplier.Email;
            existingSupplier.PhoneNumber = request.PhoneNumber ?? existingSupplier.PhoneNumber;
            existingSupplier.Address = request.Address ?? existingSupplier.Address;
            existingSupplier.TaxNumber = request.TaxNumber ?? existingSupplier.TaxNumber;
            existingSupplier.IdentificationNumber = request.IdentificationNumber ?? existingSupplier.IdentificationNumber;
            existingSupplier.IdentificationPicture = request.IdentificationPicture ?? existingSupplier.IdentificationPicture;
            existingSupplier.IdentificationPictureOwner = request.IdentificationPictureOwner ?? existingSupplier.IdentificationPictureOwner;
            existingSupplier.UpdatedAt = DateTime.UtcNow;

            _supplierRepository.Update(existingSupplier);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSupplier(Guid id)
        {
            var existingSupplier = await _supplierRepository.GetByIdAsync(id);
            if (existingSupplier == null)
            {
                return false;
            }

            existingSupplier.Status = "Inactive"; // Hoặc trạng thái phù hợp với logic xóa/vô hiệu hóa của bạn
            existingSupplier.UpdatedAt = DateTime.UtcNow;
            _supplierRepository.Update(existingSupplier);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<SupplierModel>> FilterSuppliers(string? supplierName, string? email, string? phoneNumber, string? status)
        {
            var query = _supplierRepository.GetAll();

            if (!string.IsNullOrEmpty(supplierName))
            {
                query = query.Where(s => s.SupplierName == supplierName);
            }
            if (!string.IsNullOrEmpty(email))
            {
                query = query.Where(s => s.Email == email);
            }
            if (!string.IsNullOrEmpty(phoneNumber))
            {
                query = query.Where(s => s.PhoneNumber == phoneNumber);
            }
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Status == status);
            }

            var result = await query.ToListAsync();
            return _mapper.Map<List<SupplierModel>>(result);
        }
        public async Task<IEnumerable<SupplierModel>> SearchSuppliers(string? keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                return await GetAllSuppliers(); // Hoặc trả về một danh sách rỗng
            }

            var lowerKeyword = keyword.ToLower();

            var query = _supplierRepository.GetAll().Where(s =>
                (s.SupplierName != null && s.SupplierName.ToLower().Contains(lowerKeyword)) ||
                (s.Email != null && s.Email.ToLower().Contains(lowerKeyword)) ||
                (s.PhoneNumber != null && s.PhoneNumber.ToLower().Contains(lowerKeyword))
            );

            var result = await query.ToListAsync();
            return _mapper.Map<List<SupplierModel>>(result);
        }
    }
}
