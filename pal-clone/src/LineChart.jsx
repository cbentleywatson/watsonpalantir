import React, {useState} from "react";
import axios from "axios";
import Plottable  from "plottable";
import * as d3 from "d3";
import Svg from "./Svg";
import Circle from "./Circle";
//import AnimatedCircles from "./AnimatedCircles";
function LineChart() {
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
//function lineChart(){
//	return (<h1> line-chart? </h1>  )
//}




        const [text, setText] = useState("");
        const [author, setAuthor] = useState("");

         function getQuote() {
                  axios.get("http://cbw123.xyz:5000/",  { crossdomain: true }).then(response => {
                          console.log(response.data);
                          setText(response.data.text);
                          setAuthor(response.data.author);
                        });
                   }
          return (

                    <div>
                    <Svg/>
                    <Circle/>
                    {/*
                         <svg style={{
                     border: "5px solid gold"
                    }} />
                   
                      <button onClick={getQuote}>
                      Generate Quote
                  </button>
                   <h1>{text}</h1>
                  <h3>{"-" + author}</h3>
                  */}
                  </div>
                  )
        }


export default  LineChart;
