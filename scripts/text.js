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
    if (colour != null) {
      x
        .attr("fill", colour);
    }
  
    // positioning if specified
    if (
      (xPosition != null) &&
      (yPosition != null)
    ) {
      x
        .attr("dx", xPosition)
        .attr("dy", yPosition);
    }
  }