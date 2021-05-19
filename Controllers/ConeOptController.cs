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
    public class ConeOptController : ControllerBase
    {
        private double stepMax = 0.1;
        private readonly ILogger<ConeOptController> _logger;

        public ConeOptController(ILogger<ConeOptController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public ActionResult<IEnumerable<ConeOpt>> GetAll()
        {
            ConeOpt send = cones(stepMax);
            return new[]// We only want to send 1 optimisation result
            {
            send
            };
        }
        /*    [HttpPost]
            public Task<ActionResult<ConeOpt>> CreateAsync(ConeOpt product)
            {
                if (product.Description.Contains("XYZ Widget"))
                {
                    return BadRequest();
                }

        cones(product.step);

            return CreatedAtAction("step", new { step = product.step
    }, product);
        }
*/
        [HttpPost]
        public ActionResult<ConeOpt> Create(ConeOpt pet)
        {
            stepMax=pet.step;
            ConeOpt back=cones(stepMax);
            Console.WriteLine($"step is {pet.step}");

            return CreatedAtAction("step", back, back);
        }
        /*     [HttpPost]
             public IActionResult Create(ConeOpt receive)
             {
                 Console.WriteLine($"tau = {receive.tau}");
                 Console.WriteLine($"kappa = {receive.kappa}");
                 Console.WriteLine($"step = {receive.step}");
                 Display(receive.x, 1);
                 stepMax = receive.step;
                 return Accepted();
             }*/
        void Display(double[] x, double tau = 1.0)
        {
            if (x == null) return;
            foreach (var d in x)
            {
                Console.Write($"{d / tau} ");
            }
            Console.Write($"\n");
        }
        public ConeOpt cones(double stepm)
        {
            uint ncone = 1, m = 2;
            int[] cone = { 12 };
            int[] typecone = { 1 };
            double[] b = { -5e-1, 1 };
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
            int straight = 0;
            int fastbreak = 1;
            int log = 0;
            int method = 3;
            var outfile = "log";
            int homog = 1;
            var nf = 0;
            double[] SV = null, FC = null, FL = null;
            uint fcone = 0;
            safecsharp.Conic_VeryGeneral(ncone, cone, typecone, m, x, s, y, A, b, c, tau,
                kappa, comptoll, gaptoll,
                stepm, straight, fastbreak, log, outfile, method, homog, nf, SV, FL, FC, fcone);

            Console.WriteLine($"{tau[0]}   {kappa[0]}");
            Console.WriteLine($"{stepMax}");
            Display(x, tau[0]);
            Display(y, tau[0]);
            Display(s, tau[0]);
            var back = new ConeOpt();
            back.x = (double[])x.Clone();
            back.y = (double[])y.Clone();
            back.z = (double[])s.Clone();
            back.c = c;
            back.b = b;
            back.kappa = kappa[0];
            back.tau = tau[0];
            back.step = stepm;
            for (var i = 0; i < x.Length; ++i) back.x[i] /= tau[0];
            for (var i = 0; i < y.Length; ++i) back.y[i] /= tau[0];
            for (var i = 0; i < s.Length; ++i) back.z[i] /= tau[0];
            return back;
        }
    }
}
