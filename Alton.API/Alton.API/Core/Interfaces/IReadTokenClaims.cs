namespace Alton.API.Core.Interfaces
{
    public interface IReadTokenClaims
    {
        int GetUserId();
        string GetUserRole();
    }
}
