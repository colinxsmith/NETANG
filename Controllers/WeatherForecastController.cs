using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace NETANG.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
          "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            cones();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
        public void cones()
        {
            uint ncone = 1, m = 2;
            int[] cone = { 12 };
            int[] typecone = { 1 };
            double[] b = { 0, 1 };
            double[] A ={1,1,1,1,1,1,1,1,1,1,1,0,
                         0,0,0,0,0,0,0,0,0,0,0,1};
            uint n = 0;
            foreach (var k in cone)
            {
                n += (uint)k;
            }
            //safecsharp.dmx_transpose(n, m, A, A);
            var x = new double[n];
            double[] c = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0 };
            var s = new double[n];
            var y = new double[m];
            double[] tau = { 1.0 };
            double[] kappa = { 1.0 };
            var comptoll = 1e-8;
            var gaptoll = 1e-8;
            var stepmax = 1e-1;
            int straight = 0;
            int fastbreak = 1;
            int log = 2;
            int method = 2;
            var outfile = "log";
            int homog = 1;
            var nf = 0;
            double[] SV = null, FC = null, FL = null;
            uint fcone = 0;
            safecsharp.Conic_VeryGeneral(ncone, cone, typecone, m, x, s, y, A, b, c, tau,
                kappa, comptoll, gaptoll,
                stepmax, straight, fastbreak, log, outfile, method, homog, nf, SV, FL, FC, fcone);

            Console.WriteLine($"{tau[0]}   {kappa[0]}");
            foreach (var d in x)
            {
                Console.Write($"{d/tau[0]} ");
            }
            Console.Write($"\n");
            foreach (var d in s)
            {
                Console.Write($"{d/tau[0]} ");
            }
            Console.Write($"\n");
            foreach (var d in y)
            {
                Console.Write($"{d/tau[0]} ");
            }
            Console.Write($"\n");

        }
    }
}
