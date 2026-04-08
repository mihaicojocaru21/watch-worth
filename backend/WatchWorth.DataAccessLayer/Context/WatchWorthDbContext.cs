using Microsoft.EntityFrameworkCore;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Context
{
    public class WatchWorthDbContext : DbContext
    {
        public DbSet<Movie>         Movies         { get; set; }
        public DbSet<User>          Users          { get; set; }
        public DbSet<Review>        Reviews        { get; set; }
        public DbSet<Watchlist>     Watchlists     { get; set; }
        public DbSet<WatchlistItem> WatchlistItems { get; set; }
        public DbSet<RefreshToken>  RefreshTokens  { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString
                                     ?? "Data Source=watchworth.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(WatchWorthDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}