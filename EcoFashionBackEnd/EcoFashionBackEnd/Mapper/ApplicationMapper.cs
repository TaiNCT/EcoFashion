using AutoMapper;
using EcoFashionBackEnd.Dtos;
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
            CreateMap<Design, DesignModel>().ReverseMap();




            // Application mapping với enum conversion
            CreateMap<Application, ApplicationModel>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        }
    }
}
