using Alton.API.Application.DTOs.Users;
using Alton.API.Core.Entities;
using Alton.API.Core.Interfaces;
using Alton.API.Infrastructure.Data;
using Alton.API.Middlwares;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;

namespace Alton.API.Application.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<UserContext> _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserMapper _userMapper;

        public UserService(ITokenService tokenService,
              AppDbContext context,
             IPasswordHasher<UserContext> passwordHasher,
             IHttpContextAccessor httpContextAccessor,
             UserMapper userMapper)
        {
            _tokenService = tokenService;
            _context = context;
            _passwordHasher = passwordHasher;
            _httpContextAccessor = httpContextAccessor;
            _userMapper = userMapper;
        }


        public async Task<LoginResponseDto> LoginAsync(LoginDto model)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);


                var verification = _passwordHasher.VerifyHashedPassword(user, user.Password, model.Password);
                if (user == null ||
                    verification != PasswordVerificationResult.Success)
                    throw new Exception("Invalid username or password.");
                    
                var roleHandler = UserMapper.MapRole(user.Role.ToString());
                string secret = roleHandler[1];
                string role = roleHandler[0];
                var token = _tokenService.CreateToken(user, role);

                return new LoginResponseDto
                {
                    Token = token,
                    SecretCode = secret
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync() =>
            (await _context.Users.AsNoTracking().ToListAsync()).Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Password = u.Password,
                Role = u.Role,
                IsActive = u.IsActive
            });

        public async Task<ResponseDto> ChangePassword(ChangePasswordDto model)
        {
            try
            {
                var result = new ResponseDto();
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
                if (user == null)
                    throw new Exception("User not found");

                var passwordVerification = _passwordHasher.VerifyHashedPassword(user, user.Password, model.OldPassword);
                if (passwordVerification != PasswordVerificationResult.Success)
                    throw new Exception("Old password is incorrect");

                user.Password = _passwordHasher.HashPassword(user, model.NewPassword);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                result.Data = "User Password Changed Successfully";
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
