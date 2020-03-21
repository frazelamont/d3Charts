using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Controllers
{
    public class PieChartController : Controller
    {
        public IActionResult Index()
        {
            List<TileModel> tiles = new List<TileModel>();

            tiles.Add(
                new TileModel(
                    "All on page Basic",             // title 
                    "/piechart/allonpage",            // link

                    // description
                    "beginnings of a pie chart"
                    )
                );

            ViewBag.Tiles = tiles;

            return View();
        }

        public IActionResult AllOnPage()
        {
            return View();
        }
    }
}