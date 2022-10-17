import React, {useState} from "react";
import axios from "axios";
import * as d3 from "d3";
class ChartClass extends React.Component {
  //const [text, setText] = useState("");
    constructor(props) {

        super(props);
        this.mySelf = this;
        this.myRef = React.createRef();
        this.state = {
          dataString: "", // When Axios returns, this will be updated...
          circleRadius : 30, // This will be used to test an update inside of a get...
          chartTitle : "Chart Title Before Axios get reequest update"
        };
        //const svgElement = d3.select(this.myRef);
        //this.svg = <svg width="100%" height="100%" id="tutorial-result"></svg>;
        //this.svgElement = d3.select(this.svg)
        
        //this.circle = <React.Fragment>
        //    <div ref ={this.myRef}></div>
        //    </React.Fragment>;
     //this.state = { counter: 0}; // state syntax for future use
    
     //const svgElement = d3.select(this.myRef.current).append('svg').attr('id','d3_demo');
      this.data = "";
      this.currentData =""; // This line  puts the type definition into the scope of the main class
      //this.currentData ="CURRENT DATA -- AS ASSIGNED OUTSIDE OF AXIOS CALL";     
      //console.log("Printing this.current DATA outside of axios call with value assi gned inside of axios call" + this.currentData);
    }

/* 
    function getSampleStockData() {
		  axios.get("http://cbw123.xyz:5000/",  { crossdomain: true }).then(response => {
			  console.log(response.data);
			  setText(response.data.text);
			  setAuthor(response.data.author);
			});
		   }
*/







 getQuote() {
  const svgElement = d3.select(this.myRef.current); // This must be called here because here it refers to the component, where as in the get it refers to axios
  axios.get("http://cbw123.xyz:5000/",  { crossdomain: true }).then(response => {
    console.log(response.data);
    //setText(response.data.text);
    //setAuthor(response.data.author);
    this.mySelf.setState({chartTitle: "chart title set in get Request"});
    // 
    svgElement.selectAll("text").text("Title Updated in getQuote with svgElement"); 
  });
  // This line updates the chart properly --- Remember that this  referes to the axios element it it's inside of the get
  //d3.select(this.myRef.current).selectAll("text").text("Title Updated in getQuote"); 
  


   }


    componentDidMount(){
      // This can be used to set up everything initially ...
            // The New Chart Information is going to come from the free code campl thing below
          // https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418/
          const self = this;
          var currentData ="current data as assigned before axios call returns";
          axios.get("http://localhost:5011/data/sampleStockData",  { crossdomain: true }).then(response => {
            //console.log(response.data);
            //setText(response.data.text);
            //setAuthor(response.data.author);
           this.currentData = JSON.stringify(response.data);
            console.log("INSIDE of axios.get!");
           this.currentData = "CURRENT DATA -- AS ASSIGNED INSIDE OF AXIOS CALL";     // THIS does not get saved
          
            currentData = JSON.stringify(response.data);
            console.log("Printint current data inside of axios Call:" +  currentData);
            self.setState({dataString: currentData}); // self refers to component wherease this refers to axios inside of call??
            self.setState({chartTitle: "chart title set in get Request"});
          
         
          


          // This is empty because axios has not fi
          console.log("After Axios Call" + currentData);

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
            svgElement.append("rect").attr("width", width).attr("height", height).attr("fill", "#859900"); // The color is from the sublime color scheme

            
             svgElement.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r",  100)
            .attr("fill", "blue");

            // JSON.parse  : converts string into java script object
            //
            //var xMin = d3.min(JSON.parse(this.currentData), d => d['date']);
            
            //var xMax = d3.max(JSON.parse(this.currentData), d => d['date']); 
            // chart -> result -> timestamp
            // chart -> result -> indicators -> quote -> (low/volume/high/close/open)
            var json = JSON.parse(currentData);
            var data = json;
            var jsonResult = json.chart.result[0];
            var priceData = jsonResult.indicators.quote[0];
            var timeStamps = jsonResult.timestamp;

            
            const chartResultsData = data['chart']['result'][0];
            const quoteData = chartResultsData['indicators']['quote'][0];
          
            const filteredData = chartResultsData['timestamp'].map((time, index) => ({
              date: new Date(time * 1000),
              high: quoteData['high'][index],
              low: quoteData['low'][index],
              open: quoteData['open'][index],
              close: quoteData['close'][index],
              volume: quoteData['volume'][index]
            }))
           /* */

           console.log("Print filtered Data");
           console.log(filteredData);






            //console.log("Printing Object");
            //console.log();
            //console.log(jsonResult.indicators.quote[0].low);
            var yMin = d3.min(filteredData, d => d['close']);
            var yMax = d3.max(filteredData, d => d['close']);            
            var xMin =100;
            xMin = d3.min(filteredData, d => d['date']);
            var xMax = d3.max(filteredData, d => d['date']);
            console.log ("Attempting to Print this.Current Data inside of didMount");
            console.log("Current Data inside of did mount (should not be empty):" + this.currentData);
            console.log(" End of XData");  
            const x_scale = d3.scaleLinear()
	       // .range([margin.left, width - margin.right])
          ///xMin =100
	          .domain([xMin, xMax])
            .range([margin.left, width-margin.left]) ;

            const y_scale = d3.scaleLinear()
            .domain([yMin,yMax])
            .range([height - margin.bottom, margin.top]);
            
            let x_axis = d3.axisBottom(x_scale);
            let y_axis = d3.axisLeft(y_scale);


// This Creates the line!

            const line = d3.line()
            .x(d => {
              return x_scale(d['date']);
            })
            .y(d => {
              return y_scale(d['close']);
            });

svgElement
.append('path')
.data([filteredData]) // binds data to the line
.style('fill', 'none')
.attr('id', 'priceChart')
.attr('stroke', 'steelblue')
.attr('stroke-width', '1.5')
.attr('d', line);


// End of Line Creation 



            // add y axis
            svgElement
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(y_axis);
            // add y axis
        
            svgElement
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(x_axis)
            .style("text-anchor", "end")
            ;

           var yElements = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
            var xElements = Array.from(Array(1000).keys());
            //const result = a1.map((item,index) => {return [item,a2[index]]})
            
            const result = xElements.map((item,index) => {return [item, 99]});
            
            //console.log(result);
           /*
            var line = d3.line()
            .x(Array.from(Array(1000).keys()))
            .y(Array.from({length: 40}, () => Math.floor(Math.random() * 40)));
             */
            
            svgElement.append('line')
            .style("stroke", "black")
            .style("stroke-width", 10)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 200)
            .attr("y2", 200); 


            /*
            const xMin = d3.min(this.currentData, d => d['date']);
            const xMax = d3.max(this.currentData, d => d['date']);
                */ 

            svgElement
            .append("path")
            .attr("d", d3.line()([[0, 100], [100, 100], [100, 150], [150, 150]]))
            .attr("stroke", "purple")
            .style("stroke-width", 5)
            .style("fill", "none") // Without this a weird black shape is produced behid the line
            ;

            // If things go terribly wrong... Consider adding react dom library ...https://github.com/react-d3-library/react-d3-library/wiki/Functionality
            svgElement
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top + 2)
            .attr("id", "chartTitle")
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("text-decoration", "underline")
            // Do not add brackets because we are already in javascript, so html react is not needed
            .text(this.state.chartTitle);

            // Select all can be used to 
            svgElement.select("#chartTitle").text("Title Updated with selection");
            //d3.select(this.myRef.current).selectAll("text").text("Title Updated with selection");
            let scale = d3.scaleLinear().domain([0, 100]).range([0, 200]);
          });
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
        // <svg ref={this.myRef} id ="chart-root"  viewBox="0 0 841.9 595.3"></svg>
        <div>
        <svg ref={this.myRef} id ="chart-root"></svg>

        <button onClick={this.getQuote.bind(this)}>
		      Generate Chart
		  </button>
      <h3>{"-" + this.state.chartTitle}</h3>
        </div>


       
      )



    }
  }
  export default ChartClass;