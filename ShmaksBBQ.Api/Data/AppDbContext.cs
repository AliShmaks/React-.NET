using Microsoft.EntityFrameworkCore;
using ShmaksBBQ.Api.Models;

namespace ShmaksBBQ.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Product> Products => Set<Product>();
    public DbSet<User> Users => Set<User>();
}