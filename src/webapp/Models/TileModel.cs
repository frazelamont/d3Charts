using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace webapp.Models
{
    public class TileModel
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        
        /// <summary>
        /// default constructor
        /// </summary>
        public TileModel()
        {
            // default
        }

        /// <summary>
        /// set all passed values
        /// </summary>
        /// <param name="_date"></param>
        /// <param name="_value"></param>
        /// <param name="_extraValue"></param>
        /// <param name="_third"></param>
        public TileModel(
            string _title,
            string _link,
            string _description
        )
        {
            Title = _title;
            Link = _link;
            Description = _description;
        }
    }
}