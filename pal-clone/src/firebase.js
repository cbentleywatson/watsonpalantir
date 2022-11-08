import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCxT78Fhs_ulpSjFVfmdXuc7Tc_NatI0Fs",
  authDomain: "watsonpalantir.firebaseapp.com",
  projectId: "watsonpalantir",
  storageBucket: "watsonpalantir.appspot.com",
  messagingSenderId: "397036910735",
  appId: "1:397036910735:web:98a62db6d601c8214358fa",
  measurementId: "G-5GZ2PY3C27",
  //databaseURL: "https://watsonpalantir-default-rtdb.firebaseio.com"
};
// watsonpalantir.firebaseapp.com"
/*
const config = {
  apiKey: "AIzaSyCxT78Fhs_ulpSjFVfmdXuc7Tc_NatI0Fs",
  authDomain: "watsonpalantir.firebaseapp.com",
  databaseURL: "https://watsonpalantir-default-rtdb.firebaseio.com"
};
*/
//watson
//const app  = initializeApp(config); 
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// THIS WORKS
set(ref(db, '/' + "hello"), {
    username: "hello",
    email: "hello",
    profile_picture : "hello"
  });
  // Line Doesn't Break anything....
  var dbref =ref(db, '/' + "hello");
  dbref.toJSON("hello")
  /*

  // This Might Be listening for changes in data ....
  ref.on("value", function(snapshot) {hh
    console.log(snapshot.val());
 }, function (error) {
    console.log("Error: " + error.code);
 });


*/
  /*
  get(ref(db, '/' + "hello"), {
    username: "hello",
    email: "hello",
    profile_picture : "hello"
  });
  */
//export const ref = firebase.db.ref();
// Alternate version of export found online
/*
const db = getFirestore(app)
export {db}
*/
// Alternate Version of DB for real time:
/*
// https://watsonpalantir-default-rtdb.firebaseio.com/ // database url found on my 
const config = {
  apiKey: "AIzaSyAgBvGKlPEySB6vCWVkyO5OnRiVP3pzgps",
  authDomain: "react-firebase-basic.firebaseapp.com",
  databaseURL: "https://react-firebase-basic.firebaseio.com"
};

export default config;
*/
