function buildChart(fileData, type) 
{
    // DEBUG
    //console.log(fileData);

    // set the margin from the SVG canvas to the chart area itself
    var margin = { top: 80, right: 40, bottom: 40, left: 80 };

    // subtract the values of the left & right margin
    var originalWidth = 800;
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
                            d => d.key                                            // each title is unique, categorised
                        )
                    )

                    // rangeRound rounds the values, range doesn't, this is better unless precision required
                    .rangeRound([0, height])                                        // map to height of chart (inc margin)
                    //.paddingInner(0.25)
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

    var bars = svg
                // select is individual, selectAll is multiple
                .selectAll("#chart")                                                // get all elements or create new ones
                .data(fileData)                                                     // data array from file
                .enter()                                                            // enter is always first instantiation
                .append("rect")                                                     // tell them what they are, type
                .attr("id", "bar")                                                  // give an id for all bars
            ;

    // DEBUG
    // now look at the elements in html, should see a <rect id="bar"></rect> for each data category (title in our case)
    //debugger;
    //console.log("data", fileData);

    // now make the bars go vertical, not horizontal as normal
    bars
        .attr("y", d => scaleY(d.key))
        .attr("width", d => scaleX(d.value))
        .attr("height", scaleY.bandwidth())
        .attr("fill", "dodgerblue")
}