/*
 * show grid lines
 * parameters:
 * - group (svg data group)
 * - ticks (int)
 * - columns (int)
 * - type (y, x, both)
 */
function drawGridlines(group, ticks, columns, type)
{
  switch (type)
  {
    case "y":
      drawGridY(group, ticks);
      break;

    case "x":
      drawGridX(group, columns);
      break;

    case "both":
      drawGridY(group, ticks);
      drawGridX(group, columns);
      break;

    case "default":
      break;
  }
}

/*
 * show vertical y axis grid lines
 * parameters:
 * - group (svg data group)
 * - ticks (int)
 */
function drawGridY(group, ticks)
{
  var yGridlines = d3.axisLeft(y)
    .ticks(ticks)
    .tickFormat("")
    .tickSize(-width)
    ;

  var gridy = group
    .append("g")
    .attr("class", "grid")
    .call(yGridlines)
    ;

  yGridlines(gridy);
}

/*
 * show horizontal x axis grid lines
 * parameters:
 * - group (svg data group)
 * - columns (int)
 */
function drawGridX(group, columns)
{
  var xGridlines = d3.axisBottom(x)
      .ticks(columns)
      .tickFormat("")
      .tickSize(height)
    ;
    
  var gridx = group
      .append("g")
      .attr("class", "grid")
      .call(xGridlines)
      ;

  xGridlines(gridx);
}