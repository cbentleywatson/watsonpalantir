import React, {useState} from "react";
import axios from "axios";
import * as d3 from "d3";
// Some Code Came from Here https://www.freecodecamp.org/news/d3js-tutorial-data-visualization-for-beginners/
class ChartClass extends React.Component {
    constructor(props) {
        super(props);
        //this.mySelf = this;
        this.myRef = React.createRef();
        this.state = {
//          dataString: "", // When Axios returns, this will be updated...
          chartTitle : "Chart Title"
        };
    }
// This updates the title, but it does it by directly modifying the DOM
/*
getQuote() {
    const svgElement = d3.select(this.myRef.current); // This must be called here because here it refers to the component, where as in the get it refers to axios
    axios.get("http://cbw123.xyz:5000/",  { crossdomain: true }).then(response => {
    svgElement.selectAll("text").text("Title Updated in getQuote with svgElement"); 
    });
   }
*/
   

    componentDidMount(){
          // https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418/
          // By placing virtually all of the chart initialization code inside the axios.then section, it's possible to ensure that the chart is made after loading
          axios.get("http://localhost:5011/data/sampleStockData",  { crossdomain: true }).then(response => {

            const margin = { top: 20, right: 30, bottom: 55, left: 70 },
            //width = document.querySelector("body").clientWidth,
            //height =document.querySelector("body").clientHeight;
            height = 500, width = height*2;
            const x0 = margin.left;
            const xEnd = width - margin.right;
            const y0  = height - margin.bottom;
            const yEnd =  margin.top;
            const svgElement = d3.select(this.myRef.current); // The key line that allows the selection of the svg

            svgElement.attr('width',width).attr('height',height).attr("viewBox", [0, 0, width, height]).style("background","#859900");

            // chart -> result -> timestamp
            // chart -> result -> indicators -> quote -> (low/volume/high/close/open)
           // var json = JSON.parse(currentData);
            var data =response.data ;//JSON.parse(currentData);

            
            const chartResultsData = data['chart']['result'][0]; // same as example in chart.js
            // chartResultsData['timeStamp']
            
            const quoteData = chartResultsData['indicators']['quote'][0]; // Same as in example         
            const filteredData = chartResultsData['timestamp'].map((time, index) => ({
              date: new Date(time * 1000),
              high: quoteData['high'][index],
              low: quoteData['low'][index],
              open: quoteData['open'][index],
              close: quoteData['close'][index],
              volume: quoteData['volume'][index]
            }));

            var yMin = d3.min(filteredData, d => d['close']);
            var yMax = d3.max(filteredData, d => d['close']);             
            var xMin = d3.min(filteredData, d => d['date']);
            var xMax = d3.max(filteredData, d => d['date']);

            // const formatTime = d3.timeFormat("%B %d, %Y");
            const x_scale = d3.scaleLinear()
	          .domain([xMin, xMax])
            .range([x0, xEnd]) ;

            let x_axis = d3.axisBottom(x_scale).tickFormat(d3.timeFormat("%b %y")); // Control what you see on the axis w/ time format

            const y_scale = d3.scaleLinear()
            .domain([yMin,yMax])
            //.range([height - margin.bottom, margin.top]);
            .range([y0, yEnd]);
            //.tickFormat(d3.time.format("%H"));
         
          
            let y_axis = d3.axisLeft(y_scale);

// This Creates the line!
            const line = d3.line()
            .x(   d => {return x_scale(d['date']);}   )  .y(   d => {return y_scale(d['close']);} );

            svgElement
            .append('path')
            .data([filteredData]) // binds data to the line
            .style('fill', 'none')
            .attr('id', 'priceChart')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '1.5')
            .attr('d', line); 

            svgElement
            .append("g")
            .attr("transform", `translate(${x0},0)`)
            .call(y_axis);


            // X AXIS MODIFY HERE 
            svgElement
            .append("g")
            .attr("transform", `translate(0,${y0})`)
            .call(x_axis);

            // If things go terribly wrong... Consider adding react dom library ...https://github.com/react-d3-library/react-d3-library/wiki/Functionality
            svgElement
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top + 2)
            .attr("id", "chartTitle")
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("text-decoration", "underline")
            .text(this.state.chartTitle); // Do not add brackets because we are already in javascript, so html react is not needed
            //svgElement.select("#chartTitle").text("Title Updated with selection");
            //d3.select(this.myRef.current).selectAll("text").text("Title Updated with selection");
            //d3.selectAll('.lineLegend').remove();
          });
    }

    render() {
      return (
        <div>
        <svg ref={this.myRef} id ="chart-root"></svg>
        {/** 
        <button onClick={this.getQuote.bind(this)}>
		      Generate Chart
		  </button>
           <h3>{"-" + this.state.chartTitle}</h3>
      */}
 
        </div>
      )
    }
  }
  export default ChartClass;