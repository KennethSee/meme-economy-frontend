import React, { Component } from 'react';
import * as d3 from "d3";
import helper, { getGraph, getGraphBySite, getPlotPoints } from './database/helper';
import { connect } from 'react-redux';
import { networkInterfaces } from 'os';


class BarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {source: "all", dayView: "1D"};

    this.doHandleAll = this.doHandleAll.bind(this);
    this.doHandleReddit = this.doHandleReddit.bind(this);
    this.doHandleFacebook = this.doHandleFacebook.bind(this);
    this.doHandleInstagram = this.doHandleInstagram.bind(this);

    this.doHandle1D = this.doHandle1D.bind(this);
    this.doHandle5D = this.doHandle5D.bind(this);
    this.doHandle1M = this.doHandle1M.bind(this);
  }

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
    if (this.state.source == "all") {
      getGraph(this.props.memeId).then(result => {
        //console.log(result)
        this.drawChart(getPlotPoints(result, 'hour'))
      })
      .catch (err => console.log(err));
    } else if (this.state.source == "reddit") {
      getGraphBySite(this.props.memeId,"reddit").then(result => {
        console.log(result)
        this.drawChart(getPlotPoints(result, 'hour'))
      })
      .catch (err => console.log(err));
    } else if (this.state.source == "facebook") {
      getGraphBySite(this.props.memeId,"FB").then(result => {
        console.log(result)
        this.drawChart(getPlotPoints(result, 'hour'))
      })
      .catch (err => console.log(err));
    } else if (this.state.source == "instagram") {
      getGraphBySite(this.props.memeId,"instagram").then(result => {
        console.log(result)
        this.drawChart(getPlotPoints(result, 'hour'))
      })
      .catch (err => console.log(err));
    };
  }
  
    drawChart(plotPoints) {
      if (this.state.dayView == "1D") {
        let d = new Date();
        let today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        let relevantPlotPoints = plotPoints.filter((points) => {
          return points.x.getDate() == today.getDate();
        });
        console.log(relevantPlotPoints);
        console.log(plotPoints);

          // 2. Use the margin convention practice 
          var margin = {top: 30, right: 30, bottom: 50, left: 50}
          , width = (window.innerWidth * .60) - margin.left - margin.right // Use the window's width 
          , height = (window.innerHeight * .55) - margin.top - margin.bottom; // Use the window's height

          // 5. X scale will use the index of our data
          // var xScale = d3.scaleLinear()
          // .domain([0, 15]) // input
          // .range([0, width]); // output

          // var xScale = d3.scaleTime()
          // .domain([0, 15])
          // .range([0, width]);
          let dataset = relevantPlotPoints.sort(this.compare)
          // The number of datapoints
          var n = dataset.length;
          // console.log(dataset);

          var xScale = d3.scaleTime()
          .domain([dataset[0].x, dataset[dataset.length - 1].x])
          .nice(d3.timeDay)
          .range([0, width]);

          let max_y = Math.max.apply(Math,(dataset.map((point) => point.y)));
          console.log(max_y);

          // 6. Y scale will use the input data 
          var yScale = d3.scaleLinear()
          .domain([0, max_y + 1])
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
          .call(d3.axisLeft(yScale).ticks(max_y).tickFormat(d3.format(".0f"))); // Create an axis component with d3.axisLeft

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
          .duration(4000) // Set Duration timing (ms)
          .ease(d3.easeCubicOut) // Set Easing option
          .attr("stroke-dashoffset", 0);

          // 12. Appends a circle for each datapoint 
          svg.selectAll(".dot")
          .data(dataset)
          .enter().append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d) { return xScale(d.x) })
          .attr("cy", function(d) { return yScale(d.y) })
          .attr("r", 5);
      } else if (this.state.dayView == "5D") {
        let d = new Date();
        let today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        let relevantPlotPoints = plotPoints.filter((points) => {
          return today.getDate()-5 <= points.x.getDate() <= today.getDate();
        });
        console.log(relevantPlotPoints);
        //console.log(plotPoints);

          // 2. Use the margin convention practice 
          var margin = {top: 30, right: 30, bottom: 50, left: 50}
          , width = (window.innerWidth * .60) - margin.left - margin.right // Use the window's width 
          , height = (window.innerHeight * .55) - margin.top - margin.bottom; // Use the window's height

          // 5. X scale will use the index of our data
          // var xScale = d3.scaleLinear()
          // .domain([0, 15]) // input
          // .range([0, width]); // output

          // var xScale = d3.scaleTime()
          // .domain([0, 15])
          // .range([0, width]);
          let dataset = relevantPlotPoints.sort(this.compare)
          // The number of datapoints
          var n = dataset.length;
          // console.log(dataset);

          var xScale = d3.scaleTime()
          .domain([dataset[0].x, dataset[dataset.length - 1].x])
          .nice(d3.timeDay)
          .range([0, width]);

          let max_y = Math.max.apply(Math,(dataset.map((point) => point.y)));
          console.log(max_y);

          // 6. Y scale will use the input data 
          var yScale = d3.scaleLinear()
          .domain([0, max_y + 1])
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
          .call(d3.axisBottom(xScale).ticks(4).tickFormat(d3.timeFormat("%d-%b"))); // Create an axis component with d3.axisBottom

          // 4. Call the y axis in a group tag
          svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(yScale).ticks(max_y).tickFormat(d3.format(".0f"))); // Create an axis component with d3.axisLeft

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
          .duration(4000) // Set Duration timing (ms)
          .ease(d3.easeCubicOut) // Set Easing option
          .attr("stroke-dashoffset", 0);

          // 12. Appends a circle for each datapoint 
          svg.selectAll(".dot")
          .data(dataset)
          .enter().append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d) { return xScale(d.x) })
          .attr("cy", function(d) { return yScale(d.y) })
          .attr("r", 5);
        } else if (this.state.dayView == "1M") {
          let d = new Date();
          let today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          let relevantPlotPoints = plotPoints.filter((points) => {
            return today.getDate()-30 <= points.x.getDate() <= today.getDate();
          });
          console.log(relevantPlotPoints);
          console.log(plotPoints);

            // 2. Use the margin convention practice 
            var margin = {top: 30, right: 30, bottom: 50, left: 50}
            , width = (window.innerWidth * .60) - margin.left - margin.right // Use the window's width 
            , height = (window.innerHeight * .55) - margin.top - margin.bottom; // Use the window's height

            // 5. X scale will use the index of our data
            // var xScale = d3.scaleLinear()
            // .domain([0, 15]) // input
            // .range([0, width]); // output

            // var xScale = d3.scaleTime()
            // .domain([0, 15])
            // .range([0, width]);
            let dataset = relevantPlotPoints.sort(this.compare)
            // The number of datapoints
            var n = dataset.length;
            // console.log(dataset);

            var xScale = d3.scaleTime()
            .domain([dataset[0].x, dataset[dataset.length - 1].x])
            .nice(d3.timeDay)
            .range([0, width]);

            let max_y = Math.max.apply(Math,(dataset.map((point) => point.y)));
            console.log(max_y);

            // 6. Y scale will use the input data 
            var yScale = d3.scaleLinear()
            .domain([0, max_y + 1])
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
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat("%d-%b"))); // Create an axis component with d3.axisBottom

            // 4. Call the y axis in a group tag
            svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale).ticks(max_y).tickFormat(d3.format(".0f"))); // Create an axis component with d3.axisLeft

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
            .duration(4000) // Set Duration timing (ms)
            .ease(d3.easeCubicOut) // Set Easing option
            .attr("stroke-dashoffset", 0);

            // 12. Appends a circle for each datapoint 
            svg.selectAll(".dot")
            .data(dataset)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d) { return xScale(d.x) })
            .attr("cy", function(d) { return yScale(d.y) })
            .attr("r", 5);
        };
      };
      

  
      doHandleAll() {
        this.setState({
          source: "all"
        })
      };

      doHandleReddit() {
        this.setState({
          source: "reddit"
        })
      };

      doHandleFacebook() {
        this.setState({
          source: "facebook"
        })
      };

      doHandleInstagram() {
        this.setState({
          source: "instagram"
        })
      };

      doHandle1D() {
        this.setState({
          dayView: "1D"
        })
      };

      doHandle5D() {
        this.setState({
          dayView: "5D"
        })
      };

      doHandle1M() {
        this.setState({
          dayView: "1M"
        })
      };

  render(){
    console.log("rendered");
    console.log(this.props.memeId);  

    let allButton = <button onClick={this.doHandleAll}>All</button>
    let redditButton = <button onClick={this.doHandleReddit}>Reddit</button>
    let facebookButton = <button onClick={this.doHandleFacebook}>Facebook</button>
    let instagramButton = <button onClick={this.doHandleInstagram}>Instagram</button>

    let oneDayButton = <button onClick={this.doHandle1D}>1D</button>
    let fiveDayButton = <button onClick={this.doHandle5D}>5D</button>
    let oneMonthButton = <button onClick={this.doHandle1M}>1M</button>

    switch (this.state.source) {
      case "all":
        allButton = <button className="selected" onClick={this.doHandleAll}>All</button>
        break
      case "reddit":
        redditButton = <button className="selected" onClick={this.doHandleReddit}>Reddit</button>
        break
      case "facebook":
        facebookButton = <button className="selected" onClick={this.doHandleFacebook}>Facebook</button>
        break
      case "instagram":
        instagramButton = <button className="selected" onClick={this.doHandleInstagram}>instagram</button>
        break
    };

    switch (this.state.dayView) {
      case "1D":  
        oneDayButton = <button className="selected" onClick={this.doHandle1D}>1D</button>
        break
      case "5D":
        fiveDayButton = <button className="selected" onClick={this.doHandle5D}>5D</button>
        break
      case "1M":
        oneMonthButton = <button className="selected" onClick={this.doHandle1M}>1M</button>
        break
    };
    
      if (this.props.memeId) {
        return <div className="chart">
        <div>
          Meme popularity  
        </div>
        {allButton}{redditButton}{facebookButton}{instagramButton}
        <div>{oneDayButton}{fiveDayButton}{oneMonthButton}</div>
      </div>

      } else {
        return <div></div>
      }
    }
}


const mapStateToProps = state => ({
  memeId: state.memeId,
  siteId: state.siteId
})



export default connect(
  mapStateToProps
)(BarChart);