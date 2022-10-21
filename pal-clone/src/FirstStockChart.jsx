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
    this.y_scale = d3.scaleLinear().domain([0,1000]).range([0,1000]);
    this.data ="";
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
   
  handleMouseMove = (e) => {
    const svgElement = d3.select(this.myRef.current);
    var mouseX = e.clientX - this.loc.x  ; //- dim.left ;
    var mouseY = e.clientY - this.loc.y ;//- dim.top;
    //var linePath =[[mouseX,this.yRange[0]],[mouseX , mouseY ]];
    var chartX =mouseX-this.margin.left; // Actually this would be this.margin.left //  This is the number of pixels away from the o on the xAxis
    var dataX = this.x_scale.invert(chartX+70); // this the closest time stamp given the mouse position

    var Index = d3.minIndex(this.data, d => Math.abs(d['date'] - dataX ));
    //console.log(this.data[Index]);
    var closePrice = this.data[Index];
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
     
      // var twoD_Data = [[20, 60], [60, 20], [100, 60]];

     // Set up Parts of the graph that AREN'T Data Driven 
      var height = 500, width = height*2;      
      // This Snippet allows dynamic graph resizing
      width = window.innerWidth - this.margin.left - this.margin.right; // Gets the value of the   width when auto resizing
      var targetWidth = height *2;
      width = ( width > targetWidth ? targetWidth : width ); // Shrink the graph if needeed -- Might be excessive / Useless   
      
      width = 1000; // This is here for debugging the line test thing

      this.yRange = [height - this.margin.bottom, this.margin.top]; 
      const xRange = [this.margin.left, width - this.margin.right ]; // Defines maximum and minimum horizontal boundaries of chart body 
      this.xRange =xRange;
      const svgElement = d3.select(this.myRef.current); // The key line that allows the selection of the svg CRUCIAL #859900

      // The View Box attribute was removed because I want the entire thing every time
      svgElement.attr('width',width).attr('height',height).style("background", "#859900");
      //svgElement.attr('width',width).attr('height',height).attr("viewBox", [0, 0, width, height]).style("background", "#0e3040"); // Blue version
      //Chart Title doesn't depend on the JSON received from backend, so it can be set up before the get request returns --
      
      // end of the code to find the real svg offset so that the mouse position.client off set issue can be corrected 
      var svg = document.querySelector('svg');
      var pt = svg.createSVGPoint();
      var tmpLoc = pt.matrixTransform(svg.getScreenCTM().inverse());
      this.loc = {'x': (-1)*tmpLoc.x, 'y' : (-1)*tmpLoc.y  }

      svgElement
      .append("text")
      .attr("x", width / 2)
      .attr("y", this.margin.top + 2)
      .attr("id", "chartTitle");

      svgElement.select('text#chartTitle').text("Stock Chart");

     axios.get("http://localhost:5011/data/SanitizedStockData",  { crossdomain: true }).then(response => {
            // the filteredData assignment can be used to add another layer of filtering 
            var filteredData =response.data ;

          // This syntax will filter the dates correctly
          const thisYearStartDate = new Date(2008, 11, 31);
          filteredData = filteredData.filter(function (e) {
            return e.date > thisYearStartDate;
          });
            this.data = filteredData;

            var xExtent = d3.extent(filteredData, d => d['date']);
            var yExtent = d3.extent(filteredData, d => d['close']);


            var x_scale = d3.scaleLinear().domain(xExtent).range(this.xRange);
            this.x_scale =x_scale;
            
            
            // yScale converts an xData value to a d3 value
            var y_scale = d3.scaleLinear().domain([0,1000]).range(this.yRange); // this will create a dummy yScale
            this.y_scale =y_scale;
            y_scale.domain(yExtent); // this will fill the yScale with the relevant data
            
            let x_axis = d3.axisBottom(x_scale).tickFormat(d3.timeFormat("%b %y")); // Control what you see on the axis w/ time format
            let y_axis = d3.axisLeft(y_scale);

            // This creates the line that will be loaded onto the svg 
            const line = d3.line()
            .x(  d => {return x_scale(d['date']);}   )
            .y(   d => {return y_scale(d['close']);} );
            
            svgElement  // The svgPath must be created BEFORE the data is assigned because other wise it doesn't update?
            .append('path')
            .data([filteredData]) // binds data to the line, allowing access to 
            .attr('id', 'stockPrices') // idk if this is important...  
            .attr('d', line); 


            // These lines add the axis -- the transform/ translate functions moves the y axis a bit to the right, the x axis down;
            // xRange and yRange are defined near the Margin set up
            
            // This area is being used to test if changeLine passes the info and doesn't create a second set of lines.
            svgElement.append('path').attr('id', 'testLine'); // This line is y Cross hair

            //linePath =[[0,0],[400,0 ]];
            //this.changeLine(linePath); // these can be used to draw something BEFORE

            svgElement.append("g").attr("id", "chartTitle").attr("transform", `translate(${xRange[0]},0)`).call(y_axis);

            // This function adds the axis and the transform moves it down to the lower margin
            svgElement.append("g").attr("transform", `translate(0,${this.yRange[0]})`).call(x_axis);

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