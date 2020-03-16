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
        /// <summary>
        /// list the charts
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            List<TileModel> tiles = new List<TileModel>();
            
            tiles.Add(
                new TileModel(
                    "Chart basics",             // title 
                    "/chart/basics",            // link
                    
                    // description
                    "positioning, chart core"   
                    )
                );
            tiles.Add(
                new TileModel(
                    "Line chart", 
                    "/chart/linechart",
                    "add lines to chart through code"
                    )
                );
            tiles.Add(
                new TileModel(
                    "Multiple lines", 
                    "/chart/multiplelines",
                    "show multiple lines on chart"
                    )
                );
            tiles.Add(
                new TileModel(
                    "Refactored", 
                    "/chart/refactor",
                    "move js code into files"
                    )
                );
            tiles.Add(
                new TileModel(
                    "Line generation from data array", 
                    "/chart/LinesFromData",
                    "data generates line, not manual code"
                    )
                );
            tiles.Add(
                new TileModel(
                    "vertical scaling", 
                    "/chart/SquarePower",
                    "scaled Y axis"
                    )
                );
            tiles.Add(
                new TileModel(
                    "square root scaling", 
                    "/chart/SquareRoot",
                    "scaled Y axis"
                    )
                );

            ViewBag.Tiles = tiles;

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

        /// <summary>
        /// load csv files as date source
        /// </summary>
        /// <returns></returns>
        public IActionResult DataCsv()
        {
            return View();
        }

        /// <summary>
        /// displaying circle points in the chart
        /// </summary>
        /// <returns></returns>
        public IActionResult CirclePoints()
        {
            return View();
        }

        /// <summary>
        /// displaying a legend for the chart
        /// </summary>
        /// <returns></returns>
        public IActionResult Legend()
        {
            return View();
        }

        /// <summary>
        /// curved lines
        /// </summary>
        /// <returns></returns>
        public IActionResult Curve()
        {
            return View();
        }

        /// <summary>
        /// axis square root
        /// </summary>
        /// <returns></returns>
        public IActionResult SquareRoot()
        {
            return View();
        }

        /// <summary>
        /// asix square power
        /// </summary>
        /// <returns></returns>
        public IActionResult SquarePower()
        {
            return View();
        }

        /// <summary>
        /// lines generated from data array
        /// </summary>
        /// <returns></returns>
        public IActionResult LinesFromData()
        {
            return View();
        }

        /// <summary>
        /// refactored into scripts
        /// </summary>
        /// <returns></returns>
        public IActionResult Refactor()
        {
            return View();
        }

        /// <summary>
        /// multiple lines on chart
        /// </summary>
        /// <returns></returns>
        public IActionResult MultipleLines()
        {
            return View();
        }

        /// <summary>
        /// add a line to the chart
        /// </summary>
        /// <returns></returns>
        public IActionResult LineChart()
        {
            return View();
        }

        /// <summary>
        /// chart basics
        /// </summary>
        /// <returns></returns>
        public IActionResult Basics()
        {
            return View();
        }

        /// <summary>
        ///  get data from json api
        /// </summary>
        /// <returns></returns>
        public IActionResult DataApi()
        {
            return View();
        }

        /// <summary>
        ///  get data from json api
        /// </summary>
        /// <returns></returns>
        public IActionResult RandomDataApi()
        {
            return View();
        }

        /// <summary>
        ///  data merge from json api
        /// </summary>
        /// <returns></returns>
        public IActionResult DataMerge()
        {
            return View();
        }

        /// <summary>
        ///  zoom to canvas
        /// </summary>
        /// <returns></returns>
        public IActionResult Zoom()
        {
            return View();
        }

        /// <summary>
        ///  data sorting
        /// </summary>
        /// <returns></returns>
        public IActionResult DescendingSort()
        {
            return View();
        }

        /// <summary>
        ///  data sorting
        /// </summary>
        /// <returns></returns>
        public IActionResult AscendingSort()
        {
            return View();
        }
    }
}