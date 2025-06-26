using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Repositories;
using EcoFashionBackEnd.Services;
using System.Threading.Tasks;

public class ApplicationService
{
    private readonly IRepository<Application, int> _applicationRepository;
    private readonly IMapper _mapper;
    private readonly UserService _userService;
    private readonly AppDbContext _dbContext;

    public ApplicationService(IRepository<Application, int> applicationRepository, IMapper mapper, UserService userService, AppDbContext dbContext)
    {
        _applicationRepository = applicationRepository;
        _mapper = mapper;
        _userService = userService;
        _dbContext = dbContext;
    }

    public async Task<ApplicationModel?> ApplyAsSupplier(ApplySupplierRequest request)
    {
    
        var user = await _userService.GetUserById(request.UserId);
        if (user == null) return null;

        var application = new Application
        {
            UserId = request.UserId,
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

    public async Task<ApplicationModel?> ApplyAsDesigner(ApplyDesignerRequest request)
    {
       
        var user = await _userService.GetUserById(request.UserId);
        if (user == null) return null;

        var application = new Application
        {
            UserId = request.UserId,
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

   
}