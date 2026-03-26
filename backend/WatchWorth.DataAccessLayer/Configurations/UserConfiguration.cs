using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(200);

            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.Property(u => u.Role)
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValue("user");

            builder.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(200);

            // Reviews: one User → many Reviews
            builder.HasMany(u => u.Reviews)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Watchlist: one User → one Watchlist
            builder.HasOne(u => u.Watchlist)
                .WithOne(w => w.User)
                .HasForeignKey<Watchlist>(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}