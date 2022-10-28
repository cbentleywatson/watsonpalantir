import React, {useState} from "react";
import axios from "axios";
import * as d3 from "d3";
import './FirstStockChart.css';
import { DateRangeInput2} from "@blueprintjs/datetime2";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/datetime2/lib/css/blueprint-datetime2.css";
// Consider adding react dom library ...https://github.com/react-d3-library/react-d3-library/wiki/Functionality


class FirstStockChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      chartTitle : "Chart Title"
    };
    this.height = 500;
    this.width = this.height*2;
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
    //this.options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    this.options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.dateRange =  {startDate: new Date(2017, 1, 31), endDate: new Date(2017, 12, 31) }
    this.maxDate = new Date(2018, 11, 31);
    this.minDate = new Date(2017, 1, 1);
  }
  updateDataRange(selectedStart){
    //dateRange.startDate = new Date(2017, 5, 31);
    //dateRange.endDate = new Date(2017, 10, 31);
    /*
    var inputStartTest = selectedStart[0];
    var inputEndTest = Date.parse(selectedStart[1]);
   
    
    this.startDate= new Date(2017, 6, 1);
    this.endDate = new Date(2018, 1, 1);
    var inputStart =  selectedStart[0];//new Date(2017, 6, 1);
    var inputEnd = new Date(2017, 7, 1);

    if(inputStart === null  || inputStart === NaN){
      this.startDate= new Date(2017, 6, 1);
    } else{
      this.startDate = Date.parse(inputStart);
      console.log("this.StartDate:  " + this.startDate);

       //= inputStart;
    }
    if (inputEnd === null){
      this.endDate = new Date(2018, 6, 1);
    } else{
      this.endDate =  new Date(2018, 6, 1);  // Date.parse(selectedStart[1]);
    }
    this.endDate = new Date(2018, 6, 1);
    this.startDate= new Date(2017, 6, 1);
    */
    /*
    if(inputStart === null || inputEnd === null ){

    } else{

      
    }
    */
    this.startDate= new Date(2017, 6, 1);
    this.endDate = new Date(2018, 1, 1);

    if(selectedStart[0] !==null){
      console.log("Selected Start 0: " + selectedStart[0]);
      var parsedDate0 = Date.parse(selectedStart[0]);
      // parsed dat
      if(parsedDate0 > this.minDate){
        this.startDate = parsedDate0;
        //this.startDate = this.minDate;
      }else{
        this.startDate = this.minDate;
      }
      
      this.startDate = parsedDate0;
      console.log(" Parsed universalDate0: " + parsedDate0 );



    }

    if(selectedStart[1] !==null){
      //console.log("Selected Start 1: " + selectedStart[1]);
      //this.startDate =  Date.parse(selectedStart[1]);
      //console.log(" Parsed selecteStart[1]: " + Date.parse(selectedStart[1]));
      console.log("Selected End: " + selectedStart[1]);
      var parsedDate1 = Date.parse(selectedStart[1]);
      // parsed date
      if(parsedDate1 < this.maxDate){
        this.endDate = parsedDate1;
        //this.endDate = this.maxDate;
      }else{
        this.endDate = this.maxDate;
      }

      console.log(" Parsed universalDate0: " + parsedDate1 );



    }

   // console.log(selectedStart);
    this.filterDataRange(this.startDate, this.endDate);
    this.updateChartWithFilteredData();
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
   /*
   filterData(startDate){
    this.filteredData = this.data.filter(function (e) {
      return  e.date > startDate;
    });
   }
   */
   /*
   filterDataBelow(endDate){
    this.filteredData = this.filteredData.filter(function (e) {
      return  e.date < endDate;
    });
   }
*/
   filterDataRange(startDate, endDate){
    //dateRange.startDate = new Date(2017, 5, 31);
    //dateRange.endDate = new Date(2017, 10, 31);
    this.filteredData = this.data.filter(function (e) {
      return e.date >= startDate && e.date <= endDate ;
    });
  }
  

   // All of the elements driven by data - The stock price lines, the scales, and the axis are updated here based on the filtered data
   updateChartWithFilteredData(){
    const svgElement = d3.select(this.myRef.current);
    this.x_scale.domain(d3.extent(this.filteredData, d => d['date']));
    this.y_scale.domain(d3.extent(this.filteredData, d => d['close']));
    
    
    this.x_axis = d3.axisBottom(this.x_scale).tickFormat(d3.timeFormat(" %x")); // Control what you see on the axis w/ time format
    this.y_axis = d3.axisLeft(this.y_scale);

    this.line // Put the actual data into the d3 line we want to use.
    .x(  d => {return this.x_scale(d['date']);}   )
    .y(   d => {return this.y_scale(d['close']);} );
    

    svgElement.select('path#stockPrices').data([this.filteredData]).attr('d', this.line);
    svgElement.select('g#y_axis').call(this.y_axis);
    svgElement.select('g#x_axis').call(this.x_axis);
    //svgElement.select('path#testLine')
   }

  handleMouseMove = (e) => {
    const svgElement = d3.select(this.myRef.current);
    var mouseX = e.clientX - this.loc.x  ; //- dim.left ;
    var mouseY = e.clientY - this.loc.y ;//- dim.top;


    //var linePath =[[mouseX,this.yRange[0]],[mouseX , mouseY ]];
    var chartX =mouseX-this.margin.left; // Actually this would be this.margin.left //  This is the number of pixels away from the o on the xAxis
    console.log("chart X is " +chartX);
    if(chartX <0 ){
      chartX=0;
    }

    
    //this.width = 1000;
    if(mouseX> this.width-this.margin.right){
      mouseX = this.width-this.margin.right;
    }
    
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
      //var height = 500, width = height*2;      
      // This Snippet allows dynamic graph resizing
      //width = window.innerWidth - this.margin.left - this.margin.right; // Gets the value of the   width when auto resizing
      //width = ( width > targetWidth ? targetWidth : width ); // Shrink the graph if needeed -- Might be excessive / Useless   

      this.yRange = [this.height - this.margin.bottom, this.margin.top]; 
      this.xRange = [this.margin.left, this.width - this.margin.right ];
      const svgElement = d3.select(this.myRef.current); // The key line that allows the selection of the svg CRUCIAL #859900

      // The View Box attribute was removed because I want the entire thing every time
      svgElement.attr('width', this.width).attr('height', this.height).style("background", "#859900");
      
      //Chart Title doesn't depend on the JSON received from backend, so it can be set up before the get request returns --
      
      // end of the code to find the real svg offset so that the mouse position.client off set issue can be corrected 
      var svg = document.querySelector('svg');
      var pt = svg.createSVGPoint();
      // tmpLoc hols temporaray information about where the point was placed on the screen coordinant wise
      var tmpLoc = pt.matrixTransform(svg.getScreenCTM().inverse()); 
    
      this.loc = {'x': (-1)*tmpLoc.x, 'y' : (-1)*tmpLoc.y  }

      svgElement.append("text").attr("id", "chartTitle").attr("x", this.width / 2).attr("y", this.margin.top + 2);

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
        const thisYearStartDate = new Date(2017, 1, 1);
        const thisYearEndDate = new Date(2018, 1, 1);
        //this.filterData(thisYearStartDate); // Only include data after the date listed 
        //this.filterDataBelow(thisYearEndDate);
        //console.long(this.filteredData);
        this.filterDataRange(thisYearStartDate, thisYearEndDate);
        this.updateChartWithFilteredData();
          });
    }
// When DateRangeInput2 is 
    render() {
      return (
        <div
         onMouseMove={this.handleMouseMove}
        >
         <svg ref={this.myRef} id ="chart-root"></svg>
         <DateRangeInput2 minDate={new Date(2016,12 , 1)} maxDate={new Date(2018, 12,31)} onChange={selectedStart => this.updateDataRange(selectedStart)} formatDate={date => date.toLocaleString( 'en-US', this.options)  }  parseDate={str => new Date(str)} closeOnSelection ={true}  
          />
        </div>
        
      )
    }
  }
  export default FirstStockChart;
  // this.updateDataRange(this.DateRange.selectedStart, this.DateRange.selectedEnd)