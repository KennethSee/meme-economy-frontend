import React, { Component } from 'react';
import * as d3 from "d3";
import styled from 'styled-components';

// const BarChart = styled.div`
//   width: 60%;
// `;

class BarChart extends Component {

    drawChart() {
    
      const data = [12, 5, 6, 6, 9, 10];
        
      const svg = d3.select(".chart").append("svg").attr("width", 700).attr("height", 300);
  
      svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 70)
    .attr("y", 0)
    .attr("width", 25)
    .attr("height", (d, i) => d)
    .attr("fill", "green");
      
    }
  
    componentDidMount() {
      this.drawChart();
    }

    render(){
        return <div className="chart" id={"#" + this.props.id}>Chart</div>
      }
  }
  
  export default BarChart;