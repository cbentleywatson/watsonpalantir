import React from 'react';
import './App.css';
//import { createPopper } from '@popperjs/core';
//import { Button, Spinner, DateRangeInput} from "@blueprintjs/core";
//import { DateInput2, DateRangePicker} from "@blueprintjs/datetime";
import FirstStockChart from './FirstStockChart';
//import { DateRangeInput2} from "@blueprintjs/datetime2";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/datetime2/lib/css/blueprint-datetime2.css";
//import {Date};
//import axios from "axios";
//import Quotes from  "./Quotes";
//import LineChart from "./LineChart";
//import Svg from "./Svg";
//import Plottable  from "plottable";
//import * as d3 from "d3";
//import MakeBasicChart from './MakeBasicChart';
//import Circle from "./Circle";
//import ChartClass from"./ChartClass";
//import ReactLogo from"./ReactLogo";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyCxT78Fhs_ulpSjFVfmdXuc7Tc_NatI0Fs",
  authDomain: "watsonpalantir.firebaseapp.com",
  projectId: "watsonpalantir",
  storageBucket: "watsonpalantir.appspot.com",
  messagingSenderId: "397036910735",
  appId: "1:397036910735:web:98a62db6d601c8214358fa",
  measurementId: "G-5GZ2PY3C27"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firebase access Example
/*
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

*/
//const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
//import { DateRangePicker } from '@blueprintjs/datetime';

//import "@blueprintjs/datetime/lib/css/blueprint-datetime2.css";

//import "@blueprintjs/popover2/lib/css/blueprint-popover2.css"; // installed popover2
//import "@blueprintjs/select/lib/css/blueprint-select.css";

function App() {
    return ( 
      <div className="App">
	      <header className="App-header">
        <FirstStockChart/>
       
       
          {/*
           <DateRangeInput2 formatDate={date => date.toLocaleString( 'en-US', options)  }  parseDate={str => new Date(str)} closeOnSelection ={true} />
       <DateRangeInput2/>
        <DateRangePicker/>     
          <Quotes />
          <Button/>
           */}
    
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
