//---------------------------------------------------
// replace the lines below with your own "firebaseConfig"
// key value pairs
//---------------------------------------------------

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD2MlqlqIaVOwyPkES9xgyufBeAl4M6eOQ",
    authDomain: "team-nxp.firebaseapp.com",
    databaseURL: "https://team-nxp-default-rtdb.firebaseio.com",
    projectId: "team-nxp",
    storageBucket: "team-nxp.appspot.com",
    messagingSenderId: "686610384488",
    appId: "1:686610384488:web:6310d9c5333e9f25badddd",
    measurementId: "G-KB8MM2HMGE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var storage = firebase.storage();