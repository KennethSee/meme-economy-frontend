import React, { Component } from 'react';
import * as d3 from "d3";
import helper, { getGraph, getGraphBySite, getPlotPoints } from './database/helper';
import { connect } from 'react-redux';


class BarChart extends Component {

    compare(a,b) {
        let comparison = 0;
        if (a.x > b.x) {
            comparison = 1;
        } else if (a.x < b.x) {
            comparison = -1;
        }
        return comparison;
    };

  componentDidUpdate() {
    d3.select("svg").remove();
    console.log("mount");
    getGraph(this.props.memeId).then(result => {
      //console.log(result)
      this.drawChart(getPlotPoints(result, 'hour'))
    })
    .catch (err => console.log(err));
  }
  
    drawChart(plotPoints) {
      console.log(plotPoints);

        // 2. Use the margin convention practice 
        var margin = {top: 30, right: 30, bottom: 50, left: 50}
        , width = (window.innerWidth * .55) - margin.left - margin.right // Use the window's width 
        , height = (window.innerHeight * .55) - margin.top - margin.bottom; // Use the window's height

        // 5. X scale will use the index of our data
        // var xScale = d3.scaleLinear()
        // .domain([0, 15]) // input
        // .range([0, width]); // output

        // var xScale = d3.scaleTime()
        // .domain([0, 15])
        // .range([0, width]);
        let dataset = plotPoints.sort(this.compare)
        // The number of datapoints
        var n = dataset.length;
        console.log(dataset);

        var xScale = d3.scaleTime()
        .domain([dataset[0].x, dataset[dataset.length - 1].x])
        .nice(d3.timeDay)
        .range([0, width]);

        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
        .domain([0, 15]) // input 
        .range([height, 0]); // output 

        // 7. d3's line generator
        var line = d3.line()
        .x(function(d) { return xScale(d.x); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        // .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        //var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
        

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // svg.append("g")
        // .attr("transform", "translate(5,0)")
        // .call(d3.svg.axis().scale(xScale).ticks(24).tickFormat(d3.timeFormat("%H:%M")));

        // 3. Call the x axis in a group tag
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).ticks(12).tickFormat(d3.timeFormat("%H:%M"))); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // Add X axis label
        svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Time")
        .style("font", "14px Roboto");

        // Add Y axis label
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font", "14px Roboto")
        .text("Number of hits")

        // 9. Append the path, bind the data, and call the line generator 
        var path = svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 
      
        var totalLength = path.node().getTotalLength();

        path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // Call Transition Method
        .delay(1000)
        .duration(7000) // Set Duration timing (ms)
        .ease(d3.easeCubicOut) // Set Easing option
        .attr("stroke-dashoffset", 0);

        // 12. Appends a circle for each datapoint 
        // svg.selectAll(".dot")
        // .data(dataset)
        // .enter().append("circle") // Uses the enter().append() method
        // .attr("class", "dot") // Assign a class for styling
        // .attr("cx", function(d, i) { return xScale(i) })
        // .attr("cy", function(d) { return yScale(d.y) })
        // .attr("r", 5);

      }
      

  

  render(){
    console.log("rendered");
      return <div className="chart">Meme popularity over time{this.props.memeId}</div>
    }
}


const mapStateToProps = state => ({
  memeId: state.memeId,
  siteId: state.siteId
})



export default connect(
  mapStateToProps
)(BarChart);