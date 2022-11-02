#!/usr/bin/env node
<script type="module">
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
fs = require('fs')
const sampleStockData = require("../back-end/data/sampleStockData.json")  
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

fs.writeFile('./filteredData', JSON.stringify(filteredData), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(filteredData);
});

</script>