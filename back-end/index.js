const express = require("express");

const app = express();

var sample_quote = {text:"West witdd the Night", author:"Hemingway"};


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

app.listen(5000, () => {
  console.log("listening");
});
