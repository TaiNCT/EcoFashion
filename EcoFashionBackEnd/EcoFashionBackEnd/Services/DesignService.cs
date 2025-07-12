using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
public class DesignService
{
    private readonly IRepository<Design, int> _designRepository;
    private readonly IMapper _mapper;

    public DesignService(IRepository<Design, int> designRepository, IMapper mapper)
    {
        _designRepository = designRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<DesignModel>> GetAllDesigns()
    {
        var designs = await _designRepository.GetAll().ToListAsync();
        return _mapper.Map<List<DesignModel>>(designs);
    }

    public async Task<DesignModel?> GetDesignById(int id)
    {
        var design = await _designRepository.GetByIdAsync(id);
        return _mapper.Map<DesignModel>(design);
    }

    public async Task<int> CreateDesign(CreateDesignRequest request, Guid designerId)
    {
        var designEntity = new Design
        {
            
            DesignerId = designerId,
            Name = request.Name,
            Description = request.Description,
            RecycledPercentage = request.RecycledPercentage,
            CareInstructions = request.CareInstructions,
            Price = request.Price,
            Quantity = request.Quantity,
            Gender = request.Gender,
            ProductScore = request.ProductScore,
            Status = request.Status,
            CreatedAt = DateTime.UtcNow
        };

        var createdDesign = await _designRepository.AddAsync(designEntity);
        await _designRepository.Commit();
        return createdDesign.DesignId;
    }

    public async Task<bool> UpdateDesign(int id, UpdateDesignRequest request)
    {
        var existingDesign = await _designRepository.GetByIdAsync(id);
        if (existingDesign == null) return false;

        existingDesign.Name = request.Name ?? existingDesign.Name;
        existingDesign.Description = request.Description ?? existingDesign.Description;
        existingDesign.RecycledPercentage = request.RecycledPercentage;
        existingDesign.CareInstructions = request.CareInstructions ?? existingDesign.CareInstructions;
        existingDesign.Price = request.Price;
        existingDesign.Quantity = request.Quantity;
        existingDesign.Gender = request.Gender;
        existingDesign.ProductScore = request.ProductScore;
        existingDesign.Status = request.Status ?? existingDesign.Status;

        _designRepository.Update(existingDesign);
        var result = await _designRepository.Commit();
        return result > 0;
    }

    public async Task<bool> DeleteDesign(int id)
    {
        var result = _designRepository.Remove(id);
        await _designRepository.Commit();
        return result != null;
    }
}