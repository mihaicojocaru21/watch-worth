using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Configurations
{
    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder.ToTable("Movies");
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Title)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(m => m.Genre)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(m => m.Description)
                .HasMaxLength(1000);

            builder.Property(m => m.Image)
                .HasMaxLength(500);

            // Reviews: one Movie → many Reviews
            builder.HasMany(m => m.Reviews)
                .WithOne(r => r.Movie)
                .HasForeignKey(r => r.MovieId)
                .OnDelete(DeleteBehavior.Cascade);

            // WatchlistItems: one Movie → many WatchlistItems
            builder.HasMany(m => m.WatchlistItems)
                .WithOne(wi => wi.Movie)
                .HasForeignKey(wi => wi.MovieId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}