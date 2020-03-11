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
    }
}