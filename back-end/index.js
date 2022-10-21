const express = require("express");

const app = express();

var sample_quote = {text:"West witdd the Night", author:"Hemingway"};

// This section reads the contents of the json into the program
// and creates a version with a much simpler structure called 'filteredData'
// When the user requests santitizedStockData, this simplified data structure will be sent over.
// This system moves the burden of data munging from the front end to the backend.
// This area will be modified to transition to database storage.
const sampleStockData = require("./data/sampleStockData.json")  
const chartResultsData = sampleStockData['chart']['result'][0]; // same as example in chart.js
const quoteData = chartResultsData['indicators']['quote'][0]; // Same as in example         

const filteredData = chartResultsData['timestamp'].map((time, index) => ({
  date: time*1000, //new Date(time * 1000),
  high: quoteData['high'][index],
  low: quoteData['low'][index],
  open: quoteData['open'][index],
  close: quoteData['close'][index],
  volume: quoteData['volume'][index]
}));

 // ACTUAL CORS STUFF
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



app.get("/data/SanitizedStockData", (req, res) => {
  res.json(filteredData); // This should set the header automatically
});





app.get("/", (req, res) => {
  //res.send("This is my express MODIFIED app");
 res.json(sample_quote);
//res.send(sample_quote);
	// res.json( {text:"West with the Night", author:"Hemingway"} );
});

app.get("/me", (req, res) => {
  res.send("Hi I am Laith");
});

// This needs to send the data/sample-data.json file   
app.get("/data/sampleStockData", (req, res) => {
  res.json(sampleStockData); // This should set the header automatically
});






app.listen(5011, () => {
  console.log("listening");
});
