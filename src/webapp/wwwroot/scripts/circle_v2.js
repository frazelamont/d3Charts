/*
 * show circle points
 * parameters:
 * - fields (array of data fields)
 * - group (svg data group)
 * - radius (int)
 */
function drawCirclePoints(fields, group, radius, data, x, y) {
    // create a point at each data value bit
    data.forEach(function (point) {
  
      // every data value field
      for (var i = 0; i < fields.length; i++) {
        group
          //.enter()
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
          //.merge(data)
          .transition()
          .duration(1000)
          ;
      }
    });
  }

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