import React from 'react';
import './App.css';

// New
import axios from "axios";
import Quotes from  "./Quotes";
import LineChart from "./LineChart";
import Svg from "./Svg";
import Plottable  from "plottable";
import * as d3 from "d3";

/*
import React, {useState} from "react";
import axios from "axios";
import Plottable  from "plottable";
import * as d3 from "d3";
function LineChart() {
*/

/*
        var xScale = new Plottable.Scales.Time();
var yScale = new Plottable.Scales.Linear();
var colorScale = new Plottable.Scales.Color();

var xAxis = new Plottable.Axes.Time(xScale, "bottom");
var yAxis = new Plottable.Axes.Numeric(yScale, "left");
var yLabel = new Plottable.Components.AxisLabel("Temperature (ºF)", -90);

var legend = new Plottable.Components.Legend(colorScale).maxEntriesPerRow(3);
var plots = new Plottable.Components.Group();
var panZoom = new Plottable.Interactions.PanZoom(xScale, null);
panZoom.attachTo(plots);

var table = new Plottable.Components.Table([
  [null, legend],
  [yAxis, plots],
  [null, xAxis]
]);


table.renderTo("svg#example");
*/
/*
d3.tsv("data.tsv", function(error, data) {
  var parseDate = d3.time.format("%Y%m%d").parse;
  var cityNames = d3.keys(data[0]).filter(function(key) { return key !== "date"; });
  var cities = cityNames.map(function(name) {
    return data.map(function(d) {
      return { date: parseDate(d.date), temperature: +d[name], name: name};
    });
  });

  cities.forEach(function(city) {
    plots.append(new Plottable.Plots.Line()
      .addDataset(new Plottable.Dataset(city))
      .x(function(d) { return d.date; }, xScale)
      .y(function(d) { return d.temperature; }, yScale)
      .attr("stroke", colorScale.scale(city[0].name))
      .attr("stroke-width", 1)
    );
  });
});
*/



function App() {
    return ( 
      <div className="App">
	<header className="App-header">
           <Quotes />
	   <LineChart />
     
      	</header>
       
    </div>
   
    );
}
  
export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
