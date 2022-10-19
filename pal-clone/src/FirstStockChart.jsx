import React, {useState} from "react";
import axios from "axios";
import * as d3 from "d3";
import './FirstStockChart.css';
// Consider adding react dom library ...https://github.com/react-d3-library/react-d3-library/wiki/Functionality


class FirstStockChart extends React.Component {

  // Modifies a line that displays on the graph... If the line isn't present it is appended to the svg
  changeLine(linePath) {
    const svgElement = d3.select(this.myRef.current); // This must be called here because here it refers to the component, where as in the get it refers to axios
    
    if(this.hasRendered === -1){
      console.log('this.hasRendered === -1 implying that this.hasRendered has not run yet '  + this.hasRendered);
      this.hasRendered =0;
    } else {
    console.log('outside if -- hasRendered was not === to -1 so it must have been incremented previously. this.hasRendered = ' +this.hasRendered);
    }
    //svgElement.append('path').attr('id', 'testLine'); //.attr('d', d3.line()([[0,0],[200,400]] )); //.attr("fill", "none");
    svgElement.select('path#testLine').attr('d', d3.line()(linePath )).style('stroke-width', '20');
   
    //svgElement.append('path').attr('id', 'testLine');
    //var linePath =[[0,0],[Math.random()*500, Math.random()*1000]]; // modifying this variable would trigger the change??
    //var linePath =[[0,0],[500, 1000]];
    //svgElement.select('path#testLine').attr('d', d3.line()(linePath )).style('stroke-width', '20');
   }
   
  handleMouseMove = () => {
    
    //this.changeLine([[100,100],[100,200 ]]);
    /*
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
    */
    var linePath =[[0,0],[400,0 ]];
    //const svgElement = d3.select(this.myRef.current);
    //svgElement.select('path#testLine').attr('d', d3.line()(linePath )).style('stroke-width', '20');
    this.changeLine(linePath);
  }

//lineFun = d3.line();

  
  
  constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
          chartTitle : "Chart Title"
        };
        this.hasRendered = -1;
    }
          //width = document.querySelector("body").clientWidth, // This is basically here as a note...
    componentDidMount(){
     
      /*
      var twoD_Data = [
        [20, 60],
        [60, 20],
        [100, 60],
        [140, 20],
        [180, 60],
        [220, 20]
    ];
*/
     // Set up Parts of the graph that AREN'T Data Driven 
      var height = 500, width = height*2, margin = { top: 20, right: 30, bottom: 55, left: 70 };     
      // This Snippet allows dynamic graph resizing
      width = window.innerWidth - margin.left - margin.right; // Gets the value of the  
      var targetWidth = height *2;
      width = ( width > targetWidth ? targetWidth : width ); // Shrink the graph if needeed -- Might be excessive / Useless   
      
      const yRange = [height - margin.bottom, margin.top]; // Defines the area allocated to the body of the chart  vertically 
      const xRange = [margin.left, width - margin.right ]; // Defines maximum and minimum horizontal boundaries of chart body 

      const svgElement = d3.select(this.myRef.current); // The key line that allows the selection of the svg CRUCIAL #859900
      svgElement.attr('width',width).attr('height',height).attr("viewBox", [0, 0, width, height]).style("background", "#859900");
      //svgElement.attr('width',width).attr('height',height).attr("viewBox", [0, 0, width, height]).style("background", "#0e3040");
      //Chart Title doesn't depend on the JSON received from backend, so it can be set up before the get request returns
      svgElement
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top + 2)
      .attr("id", "chartTitle")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      
      .text(this.state.chartTitle); 

     axios.get("http://localhost:5011/data/SanitizedStockData",  { crossdomain: true }).then(response => {
            // the filteredData assignment can be used to add another layer of filtering 
            var filteredData =response.data ;

          // This syntax will filter the dates correctly
          const thisYearStartDate = new Date(2017, 11, 31);
          filteredData = filteredData.filter(function (e) {
            return e.date > thisYearStartDate;
          });

            var xExtent = d3.extent(filteredData, d => d['date']);
            var yExtent = d3.extent(filteredData, d => d['close']);

            const x_scale = d3.scaleLinear().domain(xExtent).range(xRange);
            const y_scale = d3.scaleLinear().domain(yExtent).range(yRange);

            let x_axis = d3.axisBottom(x_scale).tickFormat(d3.timeFormat("%b %y")); // Control what you see on the axis w/ time format
            let y_axis = d3.axisLeft(y_scale);

            // This Creates the line!
            const line = d3.line()
            .x(  d => {return x_scale(d['date']);}   )
            .y(   d => {return y_scale(d['close']);} );

            svgElement
            .append('path')
            .data([filteredData]) // binds data to the line, allowing access to it
            //.style('fill', 'none') // Prevents d3  from treating this thin as a solid shape, breaking everything
            .attr('id', 'stockPrices') // idk if this is important...  
            .attr('d', line); 


            // The svgPath must be created BEFORE the data is assigned because other wise it doesn't update?
            
            /*
            svgElement.append('path').attr('id', 'testLine');//.attr('d', d3.line()([[0,0],[200,400]] )); //.attr("fill", "none");
            var linePath =[[0,0],[100,0]]; // modifying this variable would trigger the change??
            svgElement.select('path#testLine').attr('d', d3.line()(linePath )).style('stroke-width', '20');
            */
            // This is here to demonstrate that the gets modified  
            //svgElement.select('path#testLine').attr('d', d3.line()([[0,0],[0,100]] )).style('stroke-width', '11');
 

            // These lines add the axis -- the transform/ translate functions moves the y axis a bit to the right, the x axis down;
            // xRange and yRange are defined near the Margin set up
            
            // This area is being used to test if changeLine passes the info and doesn't create a second set of lines.
            svgElement.append('path').attr('id', 'testLine'); // This 
            var linePath =[[0,0],[500, 1000]];
            this.changeLine(linePath); 

            //linePath =[[0,0],[400,0 ]];
            //this.changeLine(linePath);
            // End of changeLine tests

            svgElement.append("g")
            .attr("transform", `translate(${xRange[0]},0)`)
            .call(y_axis);

            svgElement.append("g") // This function adds the axis and the transform moves it down to the lower margin
            .attr("transform", `translate(0,${yRange[0]})`)
            .call(x_axis);

          });
    }

    render() {
      return (
        <div
         onMouseMove={this.handleMouseMove}
        >
         <svg ref={this.myRef} id ="chart-root"></svg>
        {this.changeLine([[300,300],[400, 800]])}
        </div>
        
      )
    }
  }
  export default FirstStockChart;