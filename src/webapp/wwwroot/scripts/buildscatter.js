function buildChart(fileData) 
{
    // DEBUG
    //console.log(fileData);

    // set the margin from the SVG canvas to the chart area itself
    var margin = { top: 60, right: 40, bottom: 60, left: 140 };

    /*
     * for scatter charts, these are square
     * so align both width & height to same value
     */
        var squareSize = 750;
        var originalWidth = squareSize;
        var originalHeight = squareSize;
        
        // subtract the values of the left & right margin
        var width = originalWidth - margin.right - margin.left;                      // used by code elsewhere

        // subtract the values of the top & bottom margin
        var height = originalHeight - margin.top - margin.bottom;                    // used by code elsewhere

    /*
     * extents, highest & lowest, needed for both axis
     * separate variables, same code (poss function refactor)
     */
        // get the lowest & highest budget for X horizontal axis
        var extentBudget = d3
                    .extent(
                            fileData,                                                    // data from file, array
                            d => d.budget                                                // field for low/high finding
                        )
                    .map(
                            (d, i) => (i === 0 ? d * 0.98 : d * 1.02)                  // move off axis by 2%
                        )
                    ;

        // get the lowest & highest revenue for Y horizontal axis
        var extentRevenue = d3
                    .extent(
                        fileData,                                                      // data from file, array
                        d => d.revenue                                                 // field for low/high finding
                    )
                    .map(
                            (d, i) => (i === 0 ? d * 0.995 : d * 1.005)                  // move off axis by 0.5%
                        )
                ;

    // DEBUG
    console.log("extentBudget", extentBudget);
    console.log("extentRevenue", extentRevenue);
    //debugger;

    /*
     * now set the scale for x (horizontal)
     * use only the highest value as each bar should start at 0
     * - thus don't need full extent, only max
     * - operates like a property in a class, e.g. can pass values later
     */
    var scaleX = d3
                    .scaleLinear()
                    .domain(extentBudget)                                           // data domain is low->high values NO MAX HERE
                    .range([0, width])                                              // map to width of chart (inc margin)
                ;

    /*
     * now set scale for y (vertical)
     * using band scale, map categorical data to positions on chart
     * - operates like a property in a class, e.g. can pass values later
     */
    var scaleY = d3
                    .scaleLinear()
                    .domain(extentRevenue)                                           // data domain is low->high values NO MAX HERE
                    .range([height, 0])                                              // flipped round from normal COMPARE SCALES
                ;
    
    /*
     * get an element by the id #ID
     * build the base canvass of the chart
     * set the chart area to be indented (margins for axis, legend, header etc)
     */
    var svg = d3
                .select("#chartDiv")                                              // div id to place chart
                .append("svg")                                                    // element canvas
                .attr("id", "chartCanvas")                                        // id
                .attr("width", originalWidth)                                     // width ex margin
                .attr("height", originalHeight)                                   // height ex margin
            
                .append("g")                                                      // svg group
                .attr("id", "chartGroup")                                         // id
                .attr("transform", "translate(" +margin.left +"," +margin.top +")");   // indent chart area
            ;

    /*
     * header for chart
     * normally put most text in html as easier, except chart specific 
     * use t-span for each line
     */
        // positioning
        var header = svg
                        .append("g")
                        .attr("id", "bar-header")
                        .attr("transform", "translate(0," +(-margin.top/1.5) +")")
                        .append("text")
                    ;

        // Header
        header
            .append('tspan')
            .text('Total revenue for Harry Potter Sequels')
        ;

        // Sub-Header
        header
            .append('tspan')
            .attr('x', 0)                                                                   // start same poisition X
            .attr('dy', '1.6em')                                                            // lower than above line
            .style('font-size', '0.8em')
            .style('fill', '#555')
            .text('$US Revenue figures, exc original movie')
        ;

    /*
     * the actual scatter
     * now create rectangles set values and put on Y axis, e.g. horizontal
     */
        var scatter = svg
                        .append("g")                                                        // put them all in one place
                        .attr("id", "scatterGroup")                                         // give an id for all circles

                        // select is individual, selectAll is multiple
                        .selectAll("#scatter")                                              // get all elements or create new ones
                        .data(fileData)                                                     // data array from file
                        .enter()                                                            // enter is always first instantiation
                        .append("circle")                                                   // tell them what they are, type
                        .attr("id", "scatter")                                              // give an id for all circles

                        // now positioning & sizing
                        .attr("cx", d => scaleX(d.budget))                                  // budget - use above scale
                        .attr("cy", d => scaleY(d.revenue))                                 // revenue - use above scale
                        .attr("r", 5)                                                       // pixel radius
                        .attr("fill", "dodgerblue")                                         // colour of circle
                        .attr("fill-opacity", 0.7)                                          // easier to see if grouped together

                        // alt text on hover over
                        .append("title")                                                    // alt text
                        .text(d => d.title)                                                 // alt text - date & format
                    ;

    /*
     * the X (horizontal) & Y (vertial) axis
     * - always do these last
     */

        // shorter labels of columns
        function formatTicks(d) 
        {
            return d3
                    .format("~s")(d)                                                    // will change 0's to M, G, T

                    // now replace those single letter to something more meaningful to users
                    .replace("M", " mil")                                                // million
                    .replace("G", " bn")                                                // billion
                ;
        }

        // positioning & scaling
        var axisX = d3
                        // normally .axisBottom for horizontal axis data points
                        .axisBottom(scaleX)                                             // link to our X axis scale & position
                        .ticks(5)                                                       // don't need as many ticks
                        .tickFormat(formatTicks)                                        // each label, column effectively
                        .tickSizeInner(-height)                                          // vertical grid lines
                        .tickSizeOuter(0)                                               // hide line far right
                    ;

        // add to group & draw
        var axisXDraw = svg
                            .append("g")                                                // add new group
                            .attr("id", "axisX")                                        // give unique identifier for reference
                            .call(axisX)                                                // link to positioning & scaling
                            .attr("class", "grid line")                                 // re-use styling from line chart grid lines
                            .attr("transform", "translate(0," +height +")")             // move axis to bottom (the line)
                            .call(addLabel, 'Budget', -250, 25);
                        ;

        // positioning & scaling
        var axisY = d3
                        // normally .axisBottom for horizontal axis data points
                        .axisLeft(scaleY)                                               // link to our Y axis scale & position (left)
                        //.tickSize(-width)                                               // grids horizontal
                        .tickSizeInner(-width)                                         // vertical grid lines
                        .tickSizeOuter(0)                                               // hide line far right
                    ;

        // add to group & draw
        var axisYDraw = svg
                            .append("g")                                                // add new group
                            .attr("id", "axisY")                                        // give unique identifier for reference
                            .call(axisY)                                                // link to positioning & scaling
                            .attr("class", "grid line")                                 // re-use styling from line chart grid lines
                            .call(addLabel, 'Revenue', -125, 275);
                        ;

        // add spacing between labels and the axis
        axisYDraw
            .selectAll("text")
            .attr("dx", "-0.75em");

        axisXDraw
            .selectAll("text")
            .attr("dy", "1.5em");
}

/*
 * axis label
 */
function addLabel(axis, label, x, y) 
{
  axis    
    .select(".tick:last-of-type text")                                                  // go through all the 'ticks', get the last 'text'
    .clone()                                                                            // clone it (position)
    .text(label)                                                                        // text for the label
    .attr("x", x)                                                                       // x position (e.g. to the right/left (+/-))
    .attr("y", y)                                                                       // y position (e.g. down or up (-/+))
    .style("text-anchor", "start")                                                      // css
    .style("font-weight", "bold")
    .style("fill", "#555");
}