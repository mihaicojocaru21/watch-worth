using Microsoft.EntityFrameworkCore;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Context
{
    public class WatchWorthDbContext : DbContext
    {
        public WatchWorthDbContext(DbContextOptions<WatchWorthDbContext> options)
            : base(options) { }

        public DbSet<Movie>        Movies        { get; set; }
        public DbSet<User>         Users         { get; set; }
        public DbSet<Review>       Reviews       { get; set; }
        public DbSet<Watchlist>    Watchlists    { get; set; }
        public DbSet<WatchlistItem> WatchlistItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Apply all IEntityTypeConfiguration<T> classes in this assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(WatchWorthDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}