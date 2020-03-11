using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Controllers
{
    public class ChartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// using d3 merge functions for data
        /// </summary>
        /// <returns></returns>
        public IActionResult DataMerge()
        {
            return View();
        }
        
        /// <summary>
        /// load json file as data source
        /// </summary>
        /// <returns></returns>
        public IActionResult DataJson()
        {
            return View();
        }
    }
}