using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Exceptions;
using EcoFashionBackEnd.Helpers;
using EcoFashionBackEnd.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using EcoFashionBackEnd.Dtos.Payment;
using EcoFashionBackEnd.Dtos.User;

namespace EcoFashionBackEnd.Services
{
    public class UserService
    {
        private readonly IRepository<User, int> _userRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<UserRole, int> _userRoleRepository;
        private readonly AppDbContext _dbContext;

        private const decimal MembershipFee = 200000;


        public UserService(
            IRepository<User, int> userRepository,
            IMapper mapper,
            IRepository<UserRole, int> userRoleRepository,
            AppDbContext dbContext)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userRoleRepository = userRoleRepository;
            _dbContext = dbContext;
        }

     
       
        }
    }



