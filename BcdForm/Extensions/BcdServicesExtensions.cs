using System;
using System.Collections.Generic;
using System.Text;
using BcdLib.Components.Core;
using Microsoft.JSInterop;

namespace BcdLib.Components.Extensions
{
    public static class BcdServicesExtensions
    {
        /// <summary>
        /// add BcdService
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        [Obsolete("replace this with UseBcdForm")]
        public static IServiceProvider AddBcdService(this IServiceProvider services)
        {
            return services.UseBcdForm();
        }

        /// <summary>
        /// add BcdService
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceProvider UseBcdForm(this IServiceProvider services)
        {
            BcdServices.ServiceProvider = services;
            return services;
        }
    }
}
