using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Configurations
{
    public class WatchlistConfiguration : IEntityTypeConfiguration<Watchlist>
    {
        public void Configure(EntityTypeBuilder<Watchlist> builder)
        {
            builder.ToTable("Watchlists");
            builder.HasKey(w => w.Id);

            builder.HasMany(w => w.Items)
                .WithOne(wi => wi.Watchlist)
                .HasForeignKey(wi => wi.WatchlistId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class WatchlistItemConfiguration : IEntityTypeConfiguration<WatchlistItem>
    {
        public void Configure(EntityTypeBuilder<WatchlistItem> builder)
        {
            builder.ToTable("WatchlistItems");

            // Composite primary key
            builder.HasKey(wi => new { wi.WatchlistId, wi.MovieId });
        }
    }
}