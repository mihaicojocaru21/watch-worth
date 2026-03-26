using Microsoft.Extensions.DependencyInjection;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.BusinessLayer.Services;

namespace WatchWorth.BusinessLayer
{
    public static class BusinessLogicConfiguration
    {
        public static IServiceCollection AddBusinessLogic(this IServiceCollection services)
        {
            // IMovieRepository is registered in the API layer (it depends on JsonDb)
            // so we only register the BL services here.

            services.AddScoped<IMovieService, MovieBL>();
            services.AddScoped<IItemService,  ItemService>();

            return services;
        }
    }
}