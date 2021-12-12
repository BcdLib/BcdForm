using System;
using Microsoft.JSInterop;

namespace BcdLib.Components.Core
{
    internal class BcdServices
    {
        public static IServiceProvider ServiceProvider { get; set; }

        public static IJSRuntime JsRuntime => BcdFormContainer.BcdFormContainerInstance?.BcdJsRuntime;

        public static bool TryGetJsRuntime(out IJSRuntime jsRuntime)
        {
            jsRuntime = JsRuntime;
            return jsRuntime != null;
        }
    }
}
