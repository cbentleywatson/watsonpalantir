import React, {useState} from "react";

import * as d3 from "d3";
class ChartClass extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        //const svgElement = d3.select(this.myRef);
        //this.svg = <svg width="100%" height="100%" id="tutorial-result"></svg>;
        //this.svgElement = d3.select(this.svg)
        
        //this.circle = <React.Fragment>
        //    <div ref ={this.myRef}></div>
        //    </React.Fragment>;
     //this.state = { counter: 0}; // state syntax for future use
    
     //const svgElement = d3.select(this.myRef.current).append('svg').attr('id','d3_demo');
    }
    componentDidMount(){
            // The SVG seems to be present...
          
          
            var size = 200;
            const margin = { top: 20, right: 30, bottom: 55, left: 70 },
            //width = document.querySelector("body").clientWidth,
            //height =document.querySelector("body").clientHeight;
            height = 500, width = height*2;
            
            // height = 1/2 width ...
            //d3.select(this.myRef.current).append('p').text('Hello from D3'); // Old Code, Was update to the below
            // const svgElement = d3.select(ref.current)
            const svgElement = d3.select(this.myRef.current);
            //svgElement.attr("border", "20px solid gold"); // Did not, in fact add a border.
            
            //d3.select(this.myRef.current).append('svg')
            svgElement.attr('width',width).attr('height',height).attr("viewBox", [0, 0, width, height]);
             svgElement.append("rect").attr("width", width).attr("height", height).attr("fill", "#859900");
            
             svgElement.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r",  100)
            .attr("fill", "blue");

            const x_scale = d3
	        .scaleBand()
	        .range([margin.left, width - margin.right])
	        .padding(0.1);

            const y_scale = d3.scaleLinear()
            .range([height - margin.bottom, margin.top]);
            let x_axis = d3.axisBottom(x_scale);

            let y_axis = d3.axisLeft(y_scale);

            svgElement
 .append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(x_axis)
  .selectAll("text") // everything from this point is optional
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)");

// add y axis
svgElement
 .append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(y_axis);







//.attr("viewBox", [0, 0, width, height])
            // October 13 Graph addition:

            //const svg = d3.select("#d3_demo");


            
            svgElement
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top + 2)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("text-decoration", "underline")
            .text("Nigeria States Population");

            let scale = d3.scaleLinear().domain([0, 100]).range([0, 200]);
        
// set the dimensions and margins of the graph

/*
//const svg = d3.select("#d3_demo").attr("viewBox", [0, 0, width, height]);
//const svg = d3.select(this.myRef.current).attr("viewBox", [0, 0, width, height]);
const svg = d3.select(this.myRef.current).append('svg').attr("viewBox", [0, 0, width, height]);
*/
// add title https://www.freecodecamp.org/news/d3js-tutorial-data-visualization-for-beginners/

    }

    render() {
        //const { myState } = this.state;
      return (
       //<>{this.circle}</>

//       <div ref ={this.myRef}></div>
       //<div id ="chart-root"></div>
       //ref={ref}
        //<div ref={this.myRef} id ="chart-root" ></div>
        <svg ref={this.myRef} id ="chart-root"  viewBox="0 0 841.9 595.3"></svg>


       
      )



    }
  }
  export default ChartClass;