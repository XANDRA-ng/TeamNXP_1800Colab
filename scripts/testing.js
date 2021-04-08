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


function getApp() { document.getElementById("submit").addEventListener('click', function () {
    firebase.auth().onAuthStateChanged(function (user) {
        var n = document.getElementById("name").value;
        var dn =  document.getElementById("devname").value;
        var desc = document.getElementById("desc").value;
        console.log(n);
        console.log(dn);
        console.log(desc);

        db.collection("apps")
            .add({
            "name": n,   //from text field
            "dev_name": dn,
            "description": desc
        })

    })
})
}
getApp();


//-----------------------------------------------------------------------------------------------------------------
/* function getCity2() { document.getElementById("submit").addEventListener('click', function () {
    firebase.auth().onAuthStateChanged(function (user) {
        var appName = document.getElementById("name").value;
        var devName =  document.getElementById("devname").value;
        var desc = document.getElementById("desc").value;

        db.collection("apps")
            .add({
            "App_Name": appName,   //from text field
            "Dev_Name": devName,
            "Description": desc
        })

        console.log(appName);
        console.log(devName);
        console.log(desc);

    })
})
                    }

getCity2();*/
//-------------------------------------------------------------------------------------------------------------

// Get a reference to the database service
/*$(document).ready(function() {

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
addTemplate();*/
