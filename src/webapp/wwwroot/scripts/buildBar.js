function buildChart(fileData) 
{
    // DEBUG
    //console.log(fileData);

    // set the margin from the SVG canvas to the chart area itself
    var margin = { top: 80, right: 40, bottom: 40, left: 210 };

    // subtract the values of the left & right margin
    var originalWidth = 900;
    var width = originalWidth - margin.right - margin.left;                       // used by code elsewhere

    // subtract the values of the top & bottom margin
    var originalHeight = 600;
    var height = originalHeight - margin.top - margin.bottom;                     // used by code elsewhere

    // get the lowest & highest revenue
    var extent = d3
                   .extent(
                        fileData,                                                   // data from file, array
                        d => d.value                                                // field for low/high finding
                    )
                ;

    // DEBUG
    console.log("extent", extent);
    //debugger;

    // get the highest value only
    var max = d3
                .max(
                      fileData,                                                   // data from file, array
                      d => d.value                                                // field for highest value only
                )
            ;

    // DEBUG
    console.log("max", max);
    //debugger;

    /*
     * now set the scale 
     * using high & low values mapped to areas of chart
     * - lowest data value maps to 0
     * - highest data value maps to width
     * 
    var scale = d3
                    .scaleLinear()
                    .domain([extent])                                               // data domain is low->high values
                    .range([0, width])                                              // map to width of chart
                    ;
    */

    /*
     * now set the scale for x (horizontal)
     * use only the highest value as each bar should start at 0
     * - thus don't need full extent, only max
     * - operates like a property in a class, e.g. can pass values later
     */
    var scaleX = d3
                    .scaleLinear()
                    .domain([0, max])                                               // data domain is low->high values
                    .range([0, width])                                              // map to width of chart (inc margin)
                ;

    /*
     * now set scale for y (vertical)
     * using band scale, map categorical data to positions on chart
     * - operates like a property in a class, e.g. can pass values later
     */
    var scaleY = d3
                    .scaleBand()
                    .domain(
                        fileData.map(
                            d => d.key                                              // each title is unique, categorised
                        )
                    )

                    // rangeRound rounds the values, range doesn't, this is better unless precision required
                    .rangeRound([0, height])                                        // map to height of chart (inc margin)
                    .paddingInner(0.15)                                             // between 0 - 1, % bandwidth for padding
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
                        .attr("transform", "translate(0," +(-margin.top/2) +")")
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
     * the actual bars
     * now create rectangles set values and put on Y axis, e.g. horizontal
     */
        var bars = svg
                        // select is individual, selectAll is multiple
                        .selectAll("#chart")                                                // get all elements or create new ones
                        .data(fileData)                                                     // data array from file
                        .enter()                                                            // enter is always first instantiation
                        .append("rect")                                                     // tell them what they are, type
                        .attr("id", "bar")                                                  // give an id for all bars

                        // now horizontal bars
                        .attr("y", d => scaleY(d.key))                                      // each bar, row at new position
                        .attr("width", d => scaleX(d.value))                                // width of each bar
                        .attr("height", scaleY.bandwidth())                                 // all same height of bar
                        .attr("fill", "dodgerblue")                                         // colour of bar
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
                        .axisTop(scaleX)                                                // link to our X axis scale & position (top)
                        .tickFormat(formatTicks)                                        // each label, column effectively
                        .tickSizeInner(-height)                                         // horizontal grid lines
                        .tickSizeOuter(0)                                               // hide line far right
                    ;

        // add to group & draw
        var axisXDraw = svg
                            .append("g")                                                // add new group
                            .attr("id", "axisX")                                        // give unique identifier for reference
                            .call(axisX)                                                // link to positioning & scaling
                            .attr("class", "grid line")                                 // re-use styling from line chart grid lines
                        ;

        // positioning & scaling
        var axisY = d3
                        // normally .axisBottom for horizontal axis data points
                        .axisLeft(scaleY)                                               // link to our Y axis scale & position (left)
                        .tickSize(0)                                                    // no tick lines (can see these via bars)
                    ;

        // add to group & draw
        var axisYDraw = svg
                            .append("g")                                                // add new group
                            .attr("id", "axisY")                                        // give unique identifier for reference
                            .call(axisY)                                                // link to positioning & scaling
                            .attr("class", "grid line")                                 // re-use styling from line chart grid lines
                        ;

        // add spacing between labels and the axis
        axisYDraw
            .selectAll("text")
            .attr("dx", "-0.6em");
}