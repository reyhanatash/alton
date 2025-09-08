using Alton.API.Application.DTOs.Users;

namespace Alton.API.Core.Interfaces
{
    public interface IUserService
    {
        Task<LoginResponseDto> LoginAsync(LoginDto model);
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<ResponseDto> ChangePassword(ChangePasswordDto model);
    }
}
