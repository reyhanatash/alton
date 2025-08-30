
using Alton.API.Application.DTOs.Users;
using Alton.API.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Alton.API.WebApi.Controllers
{
    [Route("api/[controller]")]
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
            catch (Exception)
            {
                throw;
            }

        }
    }
}
