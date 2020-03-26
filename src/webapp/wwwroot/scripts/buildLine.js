function buildChart(fileData) 
{
    // DEBUG
    //console.log(fileData);

    // set the margin from the SVG canvas to the chart area itself
    var margin = { top: 60, right: 40, bottom: 60, left: 100 };

    /*
     * for scatter charts, these are square
     * so align both width & height to same value
     */
        //var squareSize = 750;
        var originalWidth = 800;
        var originalHeight = 600;
        
        // subtract the values of the left & right margin
        var width = originalWidth - margin.right - margin.left;                      // used by code elsewhere

        // subtract the values of the top & bottom margin
        var height = originalHeight - margin.top - margin.bottom;                    // used by code elsewhere
           
    //debugger;

    // get the lowest & highest revenue
    var extentData = d3
                   .extent(
                        fileData.allData,                                                   // data from file, array
                        d => d.value                                                // field for low/high finding
                    )
                ;

    // get the lowest & highest year
    var extentYear = d3
                   .extent(
                        fileData.allData,                                                   // data from file, array
                        d => d.key                                                // field for low/high finding
                    )
                ;

            /*
             * setup our X-Axis, horizontal, using the dates
             */
            var x = d3.scalePow()

                // get the min & max values in array, e.g. oldest & newest dates
                .domain(extentYear)

                // set values from left to right, min to max
                .range([0, width])
                ;
            /*
             * setup our Y-Axis, vertical, using the values
             */
            var y = d3.scalePow()

                // get the min & max values in array, e.g. lowest & highest
                .domain(extentData)

                // set values from bottom to top, min to max
                .range([height, 0])
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
                .attr("transform", "translate(" +margin.left +"," +margin.top +")")   // indent chart area
            ;

    /*
     * header for chart
     * normally put most text in html as easier, except chart specific 
     * use t-span for each line
     */
        // positioning
        var header = svg
                        .append("g")
                        .attr("id", "headerGroup")
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
            .attr('x', 0)                                                                   // start same position X
            .attr('dy', '1.6em')                                                            // lower than above line
            .style('font-size', '0.8em')
            .style('fill', '#555')
            .text('$US Revenue figures, exc original movie')
        ;

    /*
     * the actual line chart
     */
            /*
             * set our list of colours to use for various lines
             * using D3 list of 10 colours, any more than that
             * then use a new chart
             */
            var colours = d3.schemeCategory10;

            /*
             * first get a list of the data fields, e.g. everything
             * except the date
             */
            var yField = "value"; // fileData.budgetData[0].name;
            var xField = "key"; //fileData.budgetData[1].name; 
//debugger;
            
            /*
             * linear is normal line graph, but what if the data is units?
             * - e.g. units, 1 or 2, not 1.5, think of TVs etc in stock
             * - stepAfter would be if say units at start of the day
             * - stepBefore would be units at th end of the day
             */
            var LineType = ["linear", "monotone", "stepAfter"];
            var xCoord = [margin.left, (width -margin.left)];
            var yCoord = [(margin.top), (height-margin.top)];

            // store lines in groups
            var lines = svg
                            .append("g")                
                            .attr("id", "linesGroup")
                        ;

            // store labels in groups
            var labels = svg
                            .append("g")                
                            .attr("id", "labelsGroup")
                        ;
//debugger;
    /*
     * now create the actual lines based
     * on each data field, with its own colour
     * from both dataFields & colours arrays
     */
            for (var counter = 0; counter < fileData.series.length; counter++)
            {
                //debugger;
                // put the points of the line in place
                var line = plotLine(xField, yField, colours[0], LineType[1], svg, fileData.allData, x, y);
                
                /*
                  * the lines
                  */
                lines
                    .append("path")
                    .data([fileData.series[counter].values]) // fileData.budgetData])
                    .attr("fill", "none")
                    .attr("stroke", colours[counter])
                    .attr("d", line)
                ;
//debugger;
                /*
                 * the labels beside the lines
                 */
                labels
                    //.append("g")
                    //.attr("id", "series-labels")
                    //.selectAll('.series-label')
                    //.data(fileData.series[counter])
                    //.enter()
                    .append('text')
                    .attr("transform", "translate(" +(width -margin.left) +"," +yCoord[counter] +")")
                    .text(fileData.series[counter].name)
                    //.style('dominant-baseline', 'central')
                    //.style('font-size', '0.7em')
                    .style('font-weight', 'bold')
                    .style('fill', colours[counter])
                ;
            }

            // DEBUG
            console.log("plotted lines");

    /*
     * the X (horizontal) & Y (vertical) axis
     * - always do these last
     */

        // store labels in groups
        var axis = svg
                        .append("g")                
                        .attr("id", "axisGroup")
                    ;

     
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
                        .axisBottom(x)                                             // link to our X axis scale & position
                        .ticks(5)                                                       // don't need as many ticks
                        //.tickFormat(formatTicks)                                        // each label, column effectively
                        .tickSizeInner(-height)                                          // vertical grid lines
                        .tickSizeOuter(0)                                               // hide line far right
                    ;

        // add to group & draw
        var axisXDraw = axis
                            .append("g")                                                // add new group
                            .attr("id", "axisX")                                        // give unique identifier for reference
                            .call(axisX)                                                // link to positioning & scaling
                            .attr("class", "grid line")                                 // re-use styling from line chart grid lines
                            .attr("transform", "translate(0," +height +")")             // move axis to bottom (the line)
                            .call(addLabel, "year", -250, 25)
                        ;

        // positioning & scaling
        var axisY = d3
                        // normally .axisBottom for horizontal axis data points
                        .axisLeft(y)                                               // link to our Y axis scale & position (left)
                        //.tickSize(-width)                                               // grids horizontal
                        .tickFormat(formatTicks)                                        // each label, column effectively
                        .tickSizeInner(-width)                                         // vertical grid lines
                        .tickSizeOuter(0)                                               // hide line far right
                    ;

        // add to group & draw
        var axisYDraw = axis
                            .append("g")                                                // add new group
                            .attr("id", "axisY")                                        // give unique identifier for reference
                            .call(axisY)                                                // link to positioning & scaling
                            .attr("class", "grid line")                                 // re-use styling from line chart grid lines
                            .call(addLabel, '$ USD', -85, 225)
                        ;

        // add spacing between labels and the axis
        axisYDraw
            .selectAll("text")
            .attr("dx", "-0.75em")
        ;

        axisXDraw
            .selectAll("text")
            .attr("dy", "1.5em")
        ;
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