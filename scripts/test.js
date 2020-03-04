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
    group.attr("stroke", stroke);
  }

  // title / header
  if (title != null)
  {
    group
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
 */
function drawText(group, text, size, xAxis, yAxis) {
  group
    .append("text")
    .text(text)
    .attr("x", xAxis)
    .attr("y", yAxis)
    .attr("font-size", size)
    ;
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
    */
   function drawLegend(fields, group) {

    var Xorigin = 725, Yorigin = 400;
    var Xmargin = 5, Ymargin = 20, itemHeight = 50;

    var height = fields.length * itemHeight + 2 * Ymargin;
    var width = 200, fill = "white", border = "grey";

    var itemWidth = 100;

      // link to the group which has our chart objects
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

     var currentY = Yorigin + Ymargin;
     elements.forEach(function (x) {
      
      /*
       * now the items inside the box
       * e.g. the rows
       * - these are the child rectangles
       */
      drawRectangle(
        group,                // links to parent rectangle
        x.colour,             // fill
        itemHeight,           // height 
        itemWidth,            // width 
        Xorigin + Xmargin,    // X axis 
        currentY,             // Y axis
        border               // border colour
        );

        currentY += itemHeight;
    
      });
   }