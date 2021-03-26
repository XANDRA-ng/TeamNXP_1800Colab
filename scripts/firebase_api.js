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

////////////////////////////
////////////////////////////////////////////////

    function getCity() { document.getElementById("submit").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {
    var location = document.getElementById("city").value;
    var loc =  document.getElementById("city1").value;
    var loc2 = document.getElementById("city2").value;
    console.log(location);
    console.log(loc);
    console.log(loc2);

        db.collection("reviews")
            .add({
            "name": loc,   //from text field
            "name2": loc2,
            "name3": location
        })

})
                       })
                       }

getCity();

function getCity2() { document.getElementById("submit2").addEventListener('click', function () {
    firebase.auth().onAuthStateChanged(function (user) {
        var location = document.getElementById("name").value;
        var loc =  document.getElementById("devname").value;
        var loc2 = document.getElementById("desc").value;
        console.log(location);
        console.log(loc);
        console.log(loc2);

        db.collection("reviews")
            .add({
            "name": loc,   //from text field
            "name2": loc2,
            "name3": location
        })

    })
})
                   }

getCity2();


// Get a reference to the database service
$(document).ready(function() {

    function writeCities() {
        var citiesRef = db.collection("apps");
        citiesRef.add({
            code: "new"
        });
    }
    writeCities();
});

function addTemplate() {
            db.collection("template")
                .doc("description")
                .get()
                .then(function(doc){
                var n = doc.data().template;
                $("#desc").text(n);
            })
        }
addTemplate();
