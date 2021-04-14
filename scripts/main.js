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
            .get() //READ asynch
            .then(function(snapcollection) {
                snapcollection.forEach(function(doc) {
                    console.log(doc.data().name);
                    console.log(doc.id);
                    var id = doc.id; //document id of that webcam
                    var name = doc.data().name;
                    var dev_name = doc.data().dev_name;

                    var codeString = '<div class="card-body">'+
                    '<h2 class="card-title">' + name + '</h2>'+
                    '<p class="card-text">Developer: ' + dev_name + '</p>'+
                    '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>';

                    $("#app-goes-here").append("<div style='cursor:pointer, color:white' id='" + id + "'>" + codeString + "</div>");
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

    // function ShowCollection(){
    //     db.collection("apps")
    //         .get()    //get whole collection
    //     .then(function(snap){
    //         snap.forEach(function(doc){          //cycle thru each doc 
    //             // do something with each document
    //             var name = doc.data().name;   //key "name"
    //             var dev_name = doc.data().dev_name;    //key "dev name"
                
    //             // construct the string for card
    //             var codestring = '<div>'+
    //             '<div class="card-body">'+
    //             '<h2 class="card-title">' + name + '</h2>'+
    //             '<p class="card-text">Developer: ' + dev_name + '</p>'+
    //             '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>'+
    //             '</div>';
    //             // append with jquery to DOM
    //             $("#cards-go-here").append(codestring);
    //         })
    //     })
    // }
    // showCollection();
    
});