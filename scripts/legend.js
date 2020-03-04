/*
    * show chart legend
    * parameters:
    * - fields (array of data fields)
    * - group (svg data group)
    * - titleLength (int)
    * - xStart (int)
    * - yStart (int)
    */
   function drawLegend(fields, group, titleLength, xStart, yStart) {

    // for each item in the legend
    var itemWidth = 10, itemHeight = 30;
  
    // positioning of everything
    var Xorigin = xStart;
    var Yorigin = yStart - itemHeight * fields.length;
    var Xmargin = 5, Ymargin = 20;
  
    // for the legend table
    var height = fields.length * itemHeight + 2 * Ymargin;
    var width = 200, fill = "white", border = "grey";
  
    /*
     * link to the group which has our chart objects
     * this is the legend table
     */
    drawRectangle(
      group,      // links to chart
      fill,       // fill
      height,     // height 
      width,      // width 
      Xorigin,    // X axis 
      Yorigin,    // Y axis
      border,     // border colour
      null        // no title here, reused function
    );
  
    // to store our fields with colour & title
    var elements = [];
  
    // loop through fields, massage for elements array
    for (var i = 0; i < fields.length; i++) {
      /*
       * give each one the correct colour
       * also used by charts in other functions
       * to match things up
       */
      var element = {
        colour: d3.schemeCategory10[i],
        title: fields[i]
      };
  
      // add into elements array
      elements.push(element);
  
      // DEBUG
      //console.dir(element);
    }
  
    // update y axis for items 
    var currentY = Yorigin + Ymargin;
  
    // each item
    elements.forEach(function (x) {
  
      /*
       * each item colour box (key)
       */
      drawRectangle(
        group,                // links to parent rectangle
        x.colour,             // fill
        itemHeight,           // height 
        itemWidth,            // width 
        Xorigin + Xmargin,    // X axis 
        currentY,             // Y axis
        border,               // border colour
        x.title               // adds a tooltip over the colour box
      );
  
      /*
       * if title is massive, limit to 8 chars then 
       * ... at the end, basically substring
       */
      var title = x.title;
      if (title.length > titleLength) {
        title = x.title.substring(0, titleLength) + "...";
      }
  
      /*
       * each item text
       */
      drawText(
        group,              // links to parent rectangle 
        title,              // actual name of line (data field) 
        "14pt",             // font size 
        Xorigin + Xmargin,   // X axis 
        currentY,           // Y axis
        x.colour,           // same colour as line
        itemWidth + Xmargin,// - same height as colour box
        Ymargin             // - above width, this is to the right
      );
  
      // update position for next item (below it)
      currentY += itemHeight;
  
    });
  }