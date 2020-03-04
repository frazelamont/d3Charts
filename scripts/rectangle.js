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
    if (stroke != null) {
      x.attr("stroke", stroke);
    }
  
    // title / header
    if (title != null) {
      x
        .append("title")
        .text(title);
    }
  }