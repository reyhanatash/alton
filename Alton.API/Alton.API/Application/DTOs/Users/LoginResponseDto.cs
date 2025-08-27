namespace Alton.API.Application.DTOs.Users
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string SecretCode { get; set; } = string.Empty;
    }
}
