using Alton.API.Core.Entities;
using Microsoft.EntityFrameworkCore;


namespace Alton.API.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<UserContext> Users { get; set; }
        public DbSet<CodeContext> Codes { get; set; }
        public DbSet<UserAssignmentContext> UserAssignments { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
