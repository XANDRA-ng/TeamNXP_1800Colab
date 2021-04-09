$(document).ready(function() {


    function sayHello() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                // Do something for the user here. 
                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function(doc) {
                        var n = doc.data().name;
                        console.log(n);
                        //$("#username").text(n);
                        document.getElementById("username").innerText = n;
                    })
            } else {
                // No user is signed in.
            }
        });
    }

    sayHello();

    function displayWebcams() {
        //console.log("inside display web cams");
        db.collection("apps")
            //.where("fields.geo_local_area", "in", ["Downtown", "Oakridge"]) //new query to look for field in a set/array
            .get() //READ asynch
            .then(function(snapcollection) {
                snapcollection.forEach(function(doc) {
                    console.log(doc.data().name);
                    console.log(doc.id);
                    var id = doc.id; //document id of that webcam
                    var name = doc.data().name;
                    //$('#webcams-go-here').append($('<p id = ${id}> ${name} </p>'));
                    $("#app-goes-here").append("<p style='cursor:pointer, color:white' id='" + id + "'>" + name + "</p>");
                    addWebcamListener(id);
                })
            })
    }
    displayWebcams();

    function addWebcamListener(id) {
        document.getElementById(id)
            .addEventListener("click", function() {
                console.log(id + "was clicked!")
                    //window.location.href="details.html";
                    //when we redirect, tack on after "?" the id of the webcam
                window.location.href = "app-info.html?id=" + id;
            });
    }

});