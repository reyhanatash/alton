namespace Alton.API.Application.DTOs.Users
{
    public class ChangePasswordDto
    {
        public int UserId { get; set; }
        public string NewPassword { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
    }
}
