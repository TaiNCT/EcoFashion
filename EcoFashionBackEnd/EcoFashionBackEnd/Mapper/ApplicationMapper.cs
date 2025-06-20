using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;

//using EcoFashionBackEnd.Common.Payloads.Requests;
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
        }
    }
}
