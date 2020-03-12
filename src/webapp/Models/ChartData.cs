using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Models
{
    public class ChartData
    {
        private DateTime dated { get; set; }
        public string date
        {
            get
            {
                return this.dated.ToShortDateString();
            }
        }
        public int value { get; set; }
        public int extraValue { get; set; }
        public int third { get; set; }

        /// <summary>
        /// set all passed values
        /// </summary>
        /// <param name="_date"></param>
        /// <param name="_value"></param>
        /// <param name="_extraValue"></param>
        /// <param name="_third"></param>
        public ChartData(
            DateTime _date, int _value, int _extraValue, int _third
        )
        {
            dated = _date;
            value = _value;
            extraValue = _extraValue;
            third = _third;
        }

        /// <summary>
        /// generate random values
        /// </summary>
        /// <param name="_date"></param>
        public ChartData(
            DateTime _date
        )
        {
            Random rand = new Random();

            dated = _date;
            value = rand.Next(12, 50);
            extraValue = rand.Next(12, 50);
            third = rand.Next(12, 50);
        }
    }
}