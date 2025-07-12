using AutoMapper;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Material;
using EcoFashionBackEnd.Dtos.MaterialType;
using EcoFashionBackEnd.Entities;

namespace EcoFashionBackEnd.Mapper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<UserRole, UserRoleModel>().ReverseMap();
            CreateMap<Supplier, SupplierModel>().ReverseMap();
            CreateMap<Designer, DesignerModel>().ReverseMap();
            CreateMap<MaterialType, MaterialTypeModel>().ReverseMap();
            CreateMap<MaterialTypeRequest, MaterialType>();
            CreateMap<Material,  MaterialModel>().ReverseMap();
            CreateMap<MaterialRequest,  Material>();
            // Application mapping với enum conversion
            CreateMap<Application, ApplicationModel>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        }
    }
}
