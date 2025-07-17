using AutoMapper;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Dtos.Design;
using EcoFashionBackEnd.Entities;

namespace EcoFashionBackEnd.Mapper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            // ---------- User ----------
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<UserRole, UserRoleModel>().ReverseMap();

            // ---------- Supplier & Designer ----------
            CreateMap<Supplier, SupplierModel>().ReverseMap();
            CreateMap<Designer, DesignerModel>().ReverseMap();

            // ---------- Design ----------
            CreateMap<Design, DesignModel>().ReverseMap();
            CreateMap<DesignModel, Design>();
            CreateMap<UpdateDesignRequest, Design>();

            // CreateDesign mapping
            CreateMap<CreateDesignRequest, DesignModel>();
            CreateMap<CreateDesignRequest, DesignFeatureModel>()
                .ForMember(dest => dest.ReduceWaste, opt => opt.MapFrom(src => src.Feature.ReduceWaste))
                .ForMember(dest => dest.LowImpactDyes, opt => opt.MapFrom(src => src.Feature.LowImpactDyes))
                .ForMember(dest => dest.Durable, opt => opt.MapFrom(src => src.Feature.Durable))
                .ForMember(dest => dest.EthicallyManufactured, opt => opt.MapFrom(src => src.Feature.EthicallyManufactured));
            CreateMap<CreateDesignFeatureRequest, DesignFeatureModel>();

            CreateMap<DesignFeatureModel, DesignFeature>().ReverseMap();

            // ---------- Material ----------
            CreateMap<MaterialDto, DesignMaterialModel>();
            CreateMap<DesignMaterialRequest, DesignMaterialModel>();
            CreateMap<DesignMaterialModel, DesignsMaterial>();

            // ---------- Design Detail Mapping (for GET) ----------
            CreateMap<DesignDetailDto, DesignDetailResponse>();
            CreateMap<DesignFeatureDto, DesignFeatureDto>(); // no change, passthrough
            CreateMap<VarientDto, VarientDto>();
            CreateMap<MaterialDto, MaterialDto>();
            CreateMap<SustainabilityCriterionDto, SustainabilityCriterionDto>();
            CreateMap<DesignerPublicDto, DesignerPublicDto>();

            // ---------- Application ----------
            CreateMap<Application, ApplicationModel>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        }
    }
}
