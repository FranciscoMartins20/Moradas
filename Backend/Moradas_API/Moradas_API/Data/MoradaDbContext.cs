using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Moradas_API.Models;

namespace Moradas_API.Data
{
    public class MoradaDbContext : IdentityDbContext<User>
    {
        public MoradaDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Morada> Moradas { get; set; }
    }
}
