namespace Alton.API.Core.Entities
{
    public class CodeContext
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreateDate { get; set; }
        public int CodeType { get; set; }
        public int IdTemp { get; set; }
        public long GeneratedCode { get; set; }
    }
}