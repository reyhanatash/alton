using Alton.API.Core.Entities;

namespace Alton.API.Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(UserContext user, string roleName);
    }
}
