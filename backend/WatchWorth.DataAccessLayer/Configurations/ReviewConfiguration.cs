using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Configurations
{
    public class ReviewConfiguration : IEntityTypeConfiguration<Review>
    {
        public void Configure(EntityTypeBuilder<Review> builder)
        {
            builder.ToTable("Reviews");
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
                .HasMaxLength(100);

            builder.Property(r => r.Username)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(r => r.Text)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(r => r.CreatedAt)
                .IsRequired()
                .HasMaxLength(50);

            // One review per user per movie
            builder.HasIndex(r => new { r.MovieId, r.UserId })
                .IsUnique();
        }
    }
}