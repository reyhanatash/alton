
using Alton.API.Application.DTOs.Users;
using Alton.API.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Alton.API.WebApi.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _user;
        public UserController(IUserService svc) => _user = svc;

        [HttpPost("login")]
        public async Task<LoginResponseDto> login(LoginDto model)
        {
            try
            {
                var result = await _user.LoginAsync(model);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getUsers")]
        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            try
            {
                var result = await _user.GetUsersAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto model)
        {
            try
            {
                var result = await _user.ChangePassword(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
