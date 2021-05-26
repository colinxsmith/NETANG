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
        private readonly ILogger<ConeOptController> _logger;

        public ConeOptController(ILogger<ConeOptController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public ActionResult<IEnumerable<ConeOpt>> GetAll()
        {
            ConeOpt send = cones();
            Display(send.c);
            Display(send.b);
            Console.WriteLine($"{send.step}");
            return new[]// We only want to send 1 optimisation result
            {
            send
            };
        }
        [HttpPost]
        public ActionResult<ConeOpt[]> Create(ConeOpt[] pet)
        {
            ConeOpt[] back = new ConeOpt[1];
            Display(pet[0].c);
            Display(pet[0].b);
            Console.WriteLine($"{pet[0].step}");
            back[0] = cones(pet[0]);
            return CreatedAtAction("DAVID", back);
        }
        void Display(double[] x, double tau = 1.0)
        {
            if (x == null) return;
            foreach (var d in x)
            {
                Console.Write($"{d / tau} ");
            }
            Console.Write($"\n");
        }
        public ConeOpt cones(ConeOpt newd = null)
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
            var comptoll = 1e-9;
            var gaptoll = 1e-9;
            int straight = 0;
            int fastbreak = 0;
            int log = 0;
            int method = 2;
            var outfile = "log";
            int homog = 1;
            var nf = 0;
            double[] SV = null, FC = null, FL = null;
            double stepm = 0.001;
            uint fcone = 0;
            if (newd != null)
            {
                stepm = newd.step;
                if (newd.b != null) b = newd.b;
                if (newd.c != null) c = newd.c;
            }
            safecsharp.Conic_VeryGeneral(ncone, cone, typecone, m, x, s, y, A, b, c, tau,
                kappa, comptoll, gaptoll,
                stepm, straight, fastbreak, log, outfile, method, homog, nf, SV, FL, FC, fcone);

            Console.WriteLine($"{tau[0]}   {kappa[0]}");
            Console.WriteLine($"step = {stepm}");
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
