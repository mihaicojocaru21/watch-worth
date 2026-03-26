using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.DataAccessLayer.Repositories;

namespace WatchWorth.DataAccessLayer
{
    public static class DataAccessLayerConfiguration
    {
        public static IServiceCollection AddDataAccessLayer(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            // Register DbContext with SQLite
            services.AddDbContext<WatchWorthDbContext>(options =>
                options.UseSqlite(
                    configuration.GetConnectionString("DefaultConnection")
                    ?? "Data Source=watchworth.db"
                ));

            // Register repositories
            services.AddScoped<IMovieRepository,    EfMovieRepository>();
            services.AddScoped<IUserRepository,     EfUserRepository>();
            services.AddScoped<IReviewRepository,   EfReviewRepository>();
            services.AddScoped<IWatchlistRepository, EfWatchlistRepository>();

            return services;
        }
    }
}