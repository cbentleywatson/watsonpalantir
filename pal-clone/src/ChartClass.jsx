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
            // The New Chart Information is going to come from the free code campl thing below
          // https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418/
          
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

            const x_scale = d3
	        .scaleLinear()
	       // .range([margin.left, width - margin.right])
	       .domain([0,1000])
           .range([margin.left, width-margin.left]) 
           ;

            const y_scale = d3.scaleLinear()
            .domain([0,1000])
            .range([height - margin.bottom, margin.top]);
            
            let x_axis = d3.axisBottom(x_scale);
            let y_axis = d3.axisLeft(y_scale);



/*

            svgElement
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(x_axis)
            .selectAll("text") // everything from this point is optional ... IDK what the author ment there
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
*/
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
            
            console.log(result);
           
            var line = d3.line()
            .x(Array.from(Array(1000).keys()))
            .y(Array.from({length: 40}, () => Math.floor(Math.random() * 40)));
             
            
            svgElement.append('line')
            .style("stroke", "black")
            .style("stroke-width", 10)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 200)
            .attr("y2", 200); 
            
            //p = d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]]);
            
            svgElement
            .append("path")
            //.attr("d", line(data))
            
            

            // This Syntax creates a line with a 2d array
            
            .attr("d", d3.line()([[0, 100], [100, 100], [100, 150], [150, 150]]))
            .attr("stroke", "purple")
            .style("stroke-width", 5)
            .style("fill", "none") // Without this a weird black shape is produced behid the line
            ;
            /*
            svgElement
            .append("path")
            .attr("d", d3.line().x([0,100,100,150]).y([100,100,150,150])   )
            .attr("stroke", "purple")
            .style("stroke-width", 5)
            .style("fill", "none") // Without this a weird black shape is produced behid the line
            ;
          */
            /*
            var dd = d3.line()

                .x(result => x_scale(result[0]))
                .y(result => y_scale(result[1]));


                svgElement.append("path").attr("stroke", "steelblue").attr("stroke-width", 1.5)
                
                
                .attr("d", d3.line()
      
                .x(function(xElements) { return x_scale(x=>x) })
                .y(function(yElements) { return y_scale(x=>x) })
                
     
                );
               */ 
                //.attr("d",line);
                /*
            
            
*/

    /*
      .attr("d", d3.line()
      
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })       
        )
*/

            /*            
            svgElement.append('line')
    .style("stroke", "purple")
    .style("stroke-width", 10000);

        svgElement.append("path")
        //.datum(dataset1) 
        .attr("class", "line") 
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");

    */
            // If things go terribly wrong... Consider adding react dom library ...https://github.com/react-d3-library/react-d3-library/wiki/Functionality




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
        // <svg ref={this.myRef} id ="chart-root"  viewBox="0 0 841.9 595.3"></svg>
        <svg ref={this.myRef} id ="chart-root"></svg>


       
      )



    }
  }
  export default ChartClass;