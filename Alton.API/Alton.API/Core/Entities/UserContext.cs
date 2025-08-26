namespace Alton.API.Core.Entities
{
    public class UserContext
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
        public bool IsActive { get; set; }
    }
}
