using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Controllers
{
    public class ForceLayoutController : Controller
    {
        public IActionResult Index()
        {
            List<TileModel> tiles = new List<TileModel>();

            tiles.Add(
                new TileModel(
                    "All on page Basic",             // title 
                    "/ForceLayout/base",        // link

                    // description
                    "base of force layout graph"
                    )
                );

            ViewBag.Tiles = tiles;

            return View();
        }

        public IActionResult Base()
        {
            return View();
        }
    }
}