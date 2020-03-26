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

            tiles.Add(
                new TileModel(
                    "scatter chart budget & revenue",             // title 
                    "/barChart/scatter",       // link

                    // description
                    "show data prep in scatter chart"
                    )
                );

            tiles.Add(
                new TileModel(
                    "multiple line chart budget & revenue",             // title 
                    "/barChart/line",       // link

                    // description
                    "show data prep in line chart"
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

        /// <summary>
        /// scatter chart for revenue
        /// </summary>
        /// <returns></returns>
        public IActionResult Scatter()
        {
            return View();
        }

        /// <summary>
        /// line chart for revenue
        /// </summary>
        /// <returns></returns>
        public IActionResult Line()
        {
            return View();
        }
    }
}