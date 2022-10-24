import React, {useState} from "react";
import axios from "axios";
import * as d3 from "d3";
import './FirstStockChart.css';
// Consider adding react dom library ...https://github.com/react-d3-library/react-d3-library/wiki/Functionality


class FirstStockChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      chartTitle : "Chart Title"
    };
    this.margin = { top: 20, right: 30, bottom: 55, left: 70 };
    this.loc = [0,0];
    this.yRange =[0,0];
    this.xRange =[0,0];
    this.hasRendered = -1;
    this.x_scale = d3.scaleLinear();
    this.y_scale = d3.scaleLinear();//.domain([0,1000]).range([0,1000]);
    this.data ="";
    this.filteredData ="";
    this.line = d3.line();
}
  // Modifies a line that displays on the graph... If the line isn't present it is appended to the svg
  changeLine(linePath) {
    const svgElement = d3.select(this.myRef.current); // This must be called here because here it refers to the component, where as in the get it refers to axios
    
    if(this.hasRendered === -1){
   //   console.log('this.hasRendered === -1 implying that this.hasRendered has not run yet '  + this.hasRendered);
      this.hasRendered =0;
    } else {
 //   console.log('outside if -- hasRendered was not === to -1 so it must have been incremented previously. this.hasRendered = ' +this.hasRendered);
    }
    //svgElement.append('path').attr('id', 'testLine'); //.attr('d', d3.line()([[0,0],[200,400]] )); //.attr("fill", "none");
    svgElement.select('path#testLine').attr('d', d3.line()(linePath )).style('stroke-width', '2');
  
   }
   
   filterData(startDate){
    this.filteredData = this.data.filter(function (e) {
      return e.date > startDate;
    });

   }

   // All of the elements driven by data - The stock price lines, the scales, and the axis are updated here based on the filtered data
   updateChartWithFilteredData(){
    const svgElement = d3.select(this.myRef.current);
    this.x_scale.domain(d3.extent(this.filteredData, d => d['date']));
    this.y_scale.domain(d3.extent(this.filteredData, d => d['close']));
    
    
    let x_axis = d3.axisBottom(this.x_scale).tickFormat(d3.timeFormat("%b %y")); // Control what you see on the axis w/ time format
    let y_axis = d3.axisLeft(this.y_scale);

    this.line // Put the actual data into the d3 line we want to use.
    .x(  d => {return this.x_scale(d['date']);}   )
    .y(   d => {return this.y_scale(d['close']);} );
    

    svgElement.select('path#stockPrices').data([this.filteredData]).attr('d', this.line);
    svgElement.select('g#y_axis').call(y_axis);
    svgElement.select('g#x_axis').call(x_axis);
    //svgElement.select('path#testLine')
   }

  handleMouseMove = (e) => {
    const svgElement = d3.select(this.myRef.current);
    var mouseX = e.clientX - this.loc.x  ; //- dim.left ;
    var mouseY = e.clientY - this.loc.y ;//- dim.top;
    //var linePath =[[mouseX,this.yRange[0]],[mouseX , mouseY ]];
    var chartX =mouseX-this.margin.left; // Actually this would be this.margin.left //  This is the number of pixels away from the o on the xAxis
    var dataX = this.x_scale.invert(chartX+70); // this the closest time stamp given the mouse position

    //var Index = d3.minIndex(this.data, d => Math.abs(d['date'] - dataX ));
    var Index = d3.minIndex(this.filteredData, d => Math.abs(d['date'] - dataX ));
    //console.log(this.data[Index]);
    var closePrice = this.filteredData[Index];
    var date = new Date();
    date = closePrice.date;
    var linePath =[[mouseX,this.yRange[0]],[mouseX , this.y_scale(closePrice.close) ]];
    this.changeLine(linePath);
    const formatTime = d3.timeFormat("%B %d, %Y");
    //svgElement.select('text#chartTitle').text("mouseMove " + dataX + " chart x =" +chartX +" Index = " + Index) ;
    svgElement.select('text#chartTitle').text("Closing Price " + d3.format("($.2f")(closePrice.close)  + "    " + formatTime(date)) ;
  }
  
          //width = document.querySelector("body").clientWidth, // This is basically here as a note...
    componentDidMount(){
     // Set up Parts of the graph that AREN'T Data Driven 
      var height = 500, width = height*2;      
      // This Snippet allows dynamic graph resizing
      //width = window.innerWidth - this.margin.left - this.margin.right; // Gets the value of the   width when auto resizing
      //width = ( width > targetWidth ? targetWidth : width ); // Shrink the graph if needeed -- Might be excessive / Useless   

      this.yRange = [height - this.margin.bottom, this.margin.top]; 
      this.xRange = [this.margin.left, width - this.margin.right ];
      const svgElement = d3.select(this.myRef.current); // The key line that allows the selection of the svg CRUCIAL #859900

      // The View Box attribute was removed because I want the entire thing every time
      svgElement.attr('width',width).attr('height',height).style("background", "#859900");
      
      //Chart Title doesn't depend on the JSON received from backend, so it can be set up before the get request returns --
      
      // end of the code to find the real svg offset so that the mouse position.client off set issue can be corrected 
      var svg = document.querySelector('svg');
      var pt = svg.createSVGPoint();
      // tmpLoc hols temporaray information about where the point was placed on the screen coordinant wise
      var tmpLoc = pt.matrixTransform(svg.getScreenCTM().inverse()); 
    
      this.loc = {'x': (-1)*tmpLoc.x, 'y' : (-1)*tmpLoc.y  }

      svgElement.append("text").attr("id", "chartTitle").attr("x", width / 2).attr("y", this.margin.top + 2);

      // Default Text Title
      svgElement.select('text#chartTitle').text("Stock Chart");

      this.x_scale.range(this.xRange); // As soon as we know the width of the chart we can set the range to map to
      this.y_scale.range(this.yRange); // this will fill the yScale with the relevant data
      
      svgElement.append('path').attr('id', 'stockPrices'); // idk if this is important...  
      svgElement.append('path').attr('id', 'testLine'); // This line is y Cross hair
      // The xRange[0] element seemed like it might cause problems ... and it did. This line makes a g group named chart title and moves it to the start of the 
      // range covered by the x axis            
      // g chart title might just be a terrible minomer from debugging... Seems like it's the y_axis
      svgElement.append("g").attr("id", "y_axis").attr("transform", `translate(${this.xRange[0]},0)`);//.attr("transform", `translate(${xRange[0]},0)`).call(y_axis); 
      svgElement.append("g").attr("id", "x_axis").attr("transform", `translate(0,${this.yRange[0]})`);
    

      

      axios.get("http://localhost:5011/data/SanitizedStockData",  { crossdomain: true }).then(response => {
          
        this.data =response.data; // Data From the Server
        const thisYearStartDate = new Date(2017, 5, 31);
        this.filterData(thisYearStartDate); // Only include data after the date listed 
        this.updateChartWithFilteredData();
          });
    }

    render() {
      return (
        <div
         onMouseMove={this.handleMouseMove}
        >
         <svg ref={this.myRef} id ="chart-root"></svg>
        </div>
        
      )
    }
  }
  export default FirstStockChart;