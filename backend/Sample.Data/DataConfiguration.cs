using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using Sample.Data.Repository;

namespace Sample.Data
{
    public static class DataConfiguration
    {
        public static void AddDataLayer(this IServiceCollection services, IConfiguration configuration)
        {
            var conn = configuration.GetConnectionString("MySqlConnection");
            services.AddScoped(sqc => new MySqlConnection(conn));
            services.AddScoped<IUnitofWork, UnitofWork>();
            services.AddScoped<IObjectTypeRepository, ObjectTypeRepository>();
        }
    }
}
