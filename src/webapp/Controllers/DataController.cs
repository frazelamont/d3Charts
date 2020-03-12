using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        /// <summary>
        /// get data array from here
        /// </summary>
        [HttpGet("jsonData")]
        public JsonResult JsonData()
        {
            List<ChartData> data = new List<ChartData>();
            data.Add(new ChartData(new DateTime(2019,1,4), 12, 19, 15));
            data.Add(new ChartData(new DateTime(2019,2,4), 24, 30, 27));
            data.Add(new ChartData(new DateTime(2019,3,4), 14, 16, 20));
            data.Add(new ChartData(new DateTime(2019,4,4), 16, 13, 15));
            data.Add(new ChartData(new DateTime(2019,5,4), 38, 49, 42));
            data.Add(new ChartData(new DateTime(2019,6,4), 33, 39, 36));
            data.Add(new ChartData(new DateTime(2019,7,4), 39, 29, 33));
            data.Add(new ChartData(new DateTime(2019,8,4), 43, 35, 39));
            data.Add(new ChartData(new DateTime(2019,9,4), 44, 29, 38));
            data.Add(new ChartData(new DateTime(2019,10,4), 22, 38, 32));
            data.Add(new ChartData(new DateTime(2019,11,4), 25, 27, 32));
            data.Add(new ChartData(new DateTime(2019,12,4), 55, 44, 49));
            
            return new JsonResult(data.ToArray());
        }

        /// <summary>
        /// randomly generate ints
        /// </summary>
        [HttpGet("randomJson")]
        public JsonResult RandomJson()
        {
            List<ChartData> data = new List<ChartData>();
            data.Add(new ChartData(new DateTime(2019,4,1)));
            data.Add(new ChartData(new DateTime(2019,4,3)));
            data.Add(new ChartData(new DateTime(2019,4,4)));
            data.Add(new ChartData(new DateTime(2019,4,5)));
            data.Add(new ChartData(new DateTime(2019,4,6)));
            data.Add(new ChartData(new DateTime(2019,4,7)));
            data.Add(new ChartData(new DateTime(2019,4,8)));
            data.Add(new ChartData(new DateTime(2019,4,9)));
            data.Add(new ChartData(new DateTime(2019,4,10)));
            data.Add(new ChartData(new DateTime(2019,4,11)));
            data.Add(new ChartData(new DateTime(2019,4,12)));

            return new JsonResult(data.ToArray());
        }
    }
}