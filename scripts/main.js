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

    function displayAllApps() {
        //console.log("inside display web cams");
        db.collection("apps")
            .get() //READ asynch
            .then(function(snapcollection) {
                snapcollection.forEach(function(doc) {
                    console.log(doc.data().name);
                    console.log(doc.id);
                    var id = doc.id; //document id of that webcam
                    var name = doc.data().name;
                    var dev_name = doc.data().dev_name;

                    var codeString = '<div class="mb-3" style = "width: 90%">' +
                        '<div class="row g-0 row-cols-auto" >' + '<div class="col-4">' +
                        '<img src="images/pineapple.jpg" style = "width: 100px; padding: 5pt";>' +
                        '</div>' +
                        '<div class="col-7 align-self-center mt-3">' +
                        '<div>' +
                        '<h4>' + name + '</h4>' +
                        '<p>By: ' + dev_name + '</p>' +
                        '</div>' + '</div>'

                    $("#app-goes-here").append("<div style='cursor:pointer' id='" + id + "'>" + codeString + "</div>");
                    addAppsListener(id);
                })
            })
    }
    displayAllApps();

    function addAppsListener(id) {
        document.getElementById(id)
            .addEventListener("click", function() {
                console.log(id + "was clicked!")
                window.location.href = "app-info.html?id=" + id;
            });
    }



});