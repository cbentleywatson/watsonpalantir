const express = require("express");
const sampleStockData = require("./data/sampleStockData.json")  
const app = express();

var sample_quote = {text:"West witdd the Night", author:"Hemingway"};

// This could actually be converted to JSON her instead of in the req



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
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
