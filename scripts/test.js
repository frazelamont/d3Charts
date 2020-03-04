/*
 * show a circle
 * parameters:
 * - group (svg element)
 * - radius (int)
 * - colour (string)
 * - xAxis (int)
 * - yAxis (int)
 */
function drawCircle(group, radius, colour, xAxis, yAxis) {
  group
    .append("circle")
    .attr("fill", colour)
    .attr("r", radius)
    .attr("cx", xAxis)
    .attr("cy", yAxis)
    ;
}

/*
 * show a proportional circle
 * parameters:
 * - group (svg element)
 * - radius (int)
 * - colour (string)
 * - xAxis (int)
 * - yAxis (int)
 */
function drawProportionalCircle(group, radius, colour, xAxis, yAxis) {
  group
    .append("circle")
    .attr("fill", colour)
    .attr("r", Math.sqrt(radius))
    .attr("cx", xAxis)
    .attr("cy", yAxis)
    ;
}

/*
 * show a rectangle
 * parameters:
 * - group (svg element)
 * - colour (string)
 * - height (int)
 * - width (int)
 * - xAxis (int)
 * - yAxis (int)
 */
function drawRectangle(group, colour, height, width, xAxis, yAxis, stroke, title) {
  var x = 
  group
    .append("rect")
    .attr("fill", colour)
    .attr("width", width)
    .attr("height", height)
    .attr("x", xAxis)
    .attr("y", yAxis)
    ;

  // border
  if (stroke != null)
  {
    x.attr("stroke", stroke);
  }

  // title / header
  if (title != null)
  {
    x
      .append("title")
      .text(title);
  }
}

/*
 * show a text area
 * parameters:
 * - group (svg element)
 * - text (string)
 * - size (string)
 * - xAxis (int)
 * - yAxis (int)
 * - colour (string)
 * - xPosition (int)
 * - yPosition (int)
 */
function drawText(group, text, size, xAxis, yAxis, colour, xPosition, yPosition) {
  var x =
  group
    .append("text")
    .text(text)
    .attr("x", xAxis)
    .attr("y", yAxis)
    .attr("font-size", size)
    ;

  // colour of text
  if (colour != null)
  {
    x
    .attr("fill", colour);
  }

  // positioning if specified
  if (
    (xPosition != null)&&
    (yPosition != null)
  )
  {
    x
    .attr("dx", xPosition)
    .attr("dy", yPosition);
  }
}

/*
    * show a line
    * parameters:
    * - valueProperty (field in array for data)
    * - colour (string)
    * - curve (string)
    */
function plotLine(valueProperty, colour, curve) {
  /*
   * the actual line data
   */
  var line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d[valueProperty]));

  switch (curve)
  {
    case "linear":
      line.curve(d3.curveLinear);
      break;
    case "stepAfter":
      line.curve(d3.curveStepAfter);
      break;
    case "basis":
      line.curve(d3.curveCardinal);
      break;
    case "monotone":
      line.curve(d3.curveMonotoneX);
      break;
    case "default":
      break;
  }

  /*
   * the appearance
   */
  dataGroup.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", colour)
    .attr("d", line);
}

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
     for (var i = 0; i < fields.length; i++)
     {
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
      if (title.length > titleLength)
      {
        title = x.title.substring(0, titleLength) +"...";
      }

      /*
       * each item text
       */
        drawText(
          group,              // links to parent rectangle 
          title,              // actual name of line (data field) 
          "14pt",             // font size 
          Xorigin +Xmargin,   // X axis 
          currentY,           // Y axis
          x.colour,           // same colour as line
          itemWidth + Xmargin,// - same height as colour box
          Ymargin             // - above width, this is to the right
        );

        // update position for next item (below it)
        currentY += itemHeight;
    
      });
   }

   /*
    * show circle points
    * parameters:
    * - fields (array of data fields)
    * - group (svg data group)
    * - radius (int)
    */
   function drawCirclePoints(fields, group, radius) 
   {
    // create a point at each data value bit
    data.forEach(function (point) {

      // every data value field
      for (var i = 0; i < fields.length; i++) {
        group
              .append("circle")
              .attr("fill", d3.schemeCategory10[i])               // should be same colour as line
              .attr("r", radius)                                       // radius
              .attr("cx", x(point.date))                          // bang on data point X
              .attr("cy", y(point[fields[i]]))                    // data point Y
              .append("title")                                    // alt text
              .text("Date: " +                                    // alt text - date & format
                      d3.timeFormat("%d-%b-%Y")(point.date) + 
                      "\n" + 
                      fields[i] +                                 // alt text - name of field
                      ": " + 
                      point[fields[i]]                            // alt text - value of field
                    )
        ;
      }
  });

   }