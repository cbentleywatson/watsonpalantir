//import * as Plottable from "plottable";
import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
const MakeBasicChart = () => {
//function MakeBasicChart() {
    const ref = useRef();
    
    //const svgElement = d3.select(ref.current)
    //ref.current.style.color = 'white';
    /*
    var xScale = new Plottable.Scales.Linear();
    var yScale = new Plottable.Scales.Linear();
  
    var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
    var yAxis = new Plottable.Axes.Numeric(yScale, "left");
  
    var plot = new Plottable.Plots.Line();
    plot.x(function(d) { return d.x; }, xScale);
    plot.y(function(d) { return d.y; }, yScale);
  
    var data = [
      { "x": 0, "y": 1 },
      { "x": 1, "y": 2 },
      { "x": 2, "y": 4 },
      { "x": 3, "y": 8 }
    ];
  */
 /*
    var dataset = new Plottable.Dataset(data);
    plot.addDataset(dataset);
  
    var chart = new Plottable.Components.Table([
      [yAxis, plot],
      [null, xAxis]
    ]);
    var tut = <svg width="100%" height="100%" id="tutorial-result"></svg>
    chart.renderTo("svg#tutorial-result");
    //chart.renderTo(tut);
    */
    
    return (
        <svg ref={ref} style={{
            height: "100%",
           
          border: "20px solid gold"
        }} />
      )
  }
  export default MakeBasicChart;