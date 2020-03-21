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
                    "Data line generation", 
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
                    "CSV data file", 
                    "/chart/DataCsv",
                    "csv data source powers function which generates lines"
                    )
                );
            tiles.Add(
                new TileModel(
                    "JSON data file", 
                    "/chart/DataJson",
                    "json data source powers function which generates lines"
                    )
                );
            tiles.Add(
                new TileModel(
                    "Legend", 
                    "/chart/Legend",
                    "what parts of the chart are"
                    )
                );
            tiles.Add(
                new TileModel(
                    "square root scaling", 
                    "/chart/SquareRoot",
                    "scaled Y axis"
                    )
                );
            tiles.Add(
                new TileModel(
                    "Interprolation Curve", 
                    "/chart/Curve",
                    "curved line for trending data"
                    )
                );
            tiles.Add(
                new TileModel(
                    "Circle points", 
                    "/chart/CirclePoints",
                    "mark the data points with circles you can see and click on"
                    )
                );
            tiles.Add(
                new TileModel(
                    "JSON Api", 
                    "/chart/DataApi",
                    "json data api for chart generation "
                    )
                );
            tiles.Add(
                new TileModel(
                    "random json data from api", 
                    "/chart/RandomDataApi",
                    "refresh for new data"
                    )
                );
            tiles.Add(
                new TileModel(
                    "ascending data sort", 
                    "/chart/AscendingSort",
                    "sorts data in ascending order"
                    )
                );
            tiles.Add(
                new TileModel(
                    "descending data sort", 
                    "/chart/DescendingSort",
                    "*this is broken*"
                    )
                );
            tiles.Add(
                new TileModel(
                    "zoom", 
                    "/chart/Zoom",
                    "*this is broken*"
                    )
                );
            tiles.Add(
                new TileModel(
                    "data merge", 
                    "/chart/DataMerge",
                    "*this is broken*"
                    )
                );            
            tiles.Add(
                new TileModel(
                    "basic line", 
                    "/chart/BasicLine",
                    "basic d3 usage"
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

        ///
        /// basic line in d3
        ///
        public IActionResult BasicLine()
        {
            return View();
        }        
    }
}