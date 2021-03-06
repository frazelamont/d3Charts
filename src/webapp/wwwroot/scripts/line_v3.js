/*
    * show a line
    * parameters:
    * - valueProperty (field in array for data)
    * - colour (string)
    * - curve (string)
    */
   function plotLine(xField, yField, colour, curve, group, data, x, y) {

    //debugger;
    /*
     * the actual line data
     */
    var line = d3.line()
      .x(d => x(d[xField]))
      .y(d => y(d[yField]));

  //debugger;
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
  
    return line;
  
  }