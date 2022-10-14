import React from 'react';
import './App.css';

import axios from "axios";
import Quotes from  "./Quotes";
import LineChart from "./LineChart";
import Svg from "./Svg";
import Plottable  from "plottable";
import * as d3 from "d3";
import MakeBasicChart from './MakeBasicChart';
import Circle from "./Circle";
import ChartClass from"./ChartClass";
import ReactLogo from"./ReactLogo";

function App() {
    return ( 
      <div className="App">
	      <header className="App-header">
          <ChartClass/>
          <Quotes />
        </header>
      </div>
    
    );
}
  
export default App;

// IDK what this was for actually, ignoring it for rn.
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
