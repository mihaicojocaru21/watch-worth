using Microsoft.Extensions.DependencyInjection;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.BusinessLayer.Services;

namespace WatchWorth.BusinessLayer
{
    public static class BusinessLogicConfiguration
    {
        public static IServiceCollection AddBusinessLogic(this IServiceCollection services)
        {
            services.AddScoped<IItemService, ItemService>();
            return services;
        }
    }
}