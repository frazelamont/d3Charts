/*
 * show a circle
 * parameters:
 * - group (svg element)
 * - radius (int)
 * - colour (string)
 * - xAxis (int)
 * - yAxis (int)
 */
            function drawCircle(group, radius, colour, xAxis, yAxis)
            {
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
function drawProportionalCircle(group, radius, colour, xAxis, yAxis)
{
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
            function drawRectangle(group, colour, height, width, xAxis, yAxis)
            {
                group
                  .append("rect")
                  .attr("fill", colour)
                  .attr("width", width)
                  .attr("height", height)
                  .attr("x", xAxis)
                  .attr("y", yAxis)
                ;
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
            function drawText(group, text, size, xAxis, yAxis)
            {
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
             */
         function plotLine(valueProperty, colour)
         {
           /*
            * the actual line data
            */
            var line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d[valueProperty]))
                ;
           /*
            * the appearance
            */
            dataGroup.append("path")
                .data([data])
                .attr("fill", "none")
                .attr("stroke", colour)
                .attr("d", line)          
        }