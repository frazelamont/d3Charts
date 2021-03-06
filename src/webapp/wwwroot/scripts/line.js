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

  switch (curve) {
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