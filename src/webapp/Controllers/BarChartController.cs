using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Controllers
{
    public class BarChartController : Controller
    {
        public IActionResult Index()
        {
            List<TileModel> tiles = new List<TileModel>();

            tiles.Add(
                new TileModel(
                    "data prep",             // title 
                    "/barChart/movies",       // link

                    // description
                    "csv data load, conversion, filtering & preparation"
                    )
                );

            tiles.Add(
                new TileModel(
                    "bar chart revenue",             // title 
                    "/barChart/revenue",       // link

                    // description
                    "show data prep in bar chart"
                    )
                );

            ViewBag.Tiles = tiles;

            return View();
        }

        /// <summary>
        /// data preparation
        /// </summary>
        /// <returns></returns>
        public IActionResult Movies()
        {
            return View();
        }

        /// <summary>
        /// bar chart for revenue
        /// </summary>
        /// <returns></returns>
        public IActionResult Revenue()
        {
            return View();
        }
    }
}