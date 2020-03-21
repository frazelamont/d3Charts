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
                    "movie data",             // title 
                    "/barChart/movies",       // link

                    // description
                    "movie data from csv in bar chart"
                    )
                );

            ViewBag.Tiles = tiles;

            return View();
        }

        public IActionResult Movies()
        {
            return View();
        }
    }
}