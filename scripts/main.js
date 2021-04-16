$(document).ready(function () {

    /**
     * Shows the user's name.
     */
    function sayHello() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // Do something for the user here. 
                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
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

    /**
     * Displays all the apps in the apps collection.
     */
    function displayAllApps() {
        db.collection("apps")
            .get() //READ asynch
            .then(function (snapcollection) {
                snapcollection.forEach(function (doc) { //read each document in the collection
                    console.log(doc.data().name);
                    console.log(doc.id);
                    var id = doc.id; //document id of that webcam
                    var name = doc.data().name; //name value of the document
                    var dev_name = doc.data().dev_name;
                    var category = doc.data().category;
                    var icon = doc.data().IconPic;

                    var codeString = '<div class="each-app" style ="width: 90%">' +
                        '<div class="row g-0 row-cols-auto" >' + '<div class="col-4">' +
                        '<img src="' + icon + '" style = "width: 100px; padding: 5pt";>' +
                        '</div>' +
                        '<div class="col-7 align-self-center">' +
                        '<div>' +
                        '<h4>' + name + '</h4>' +
                        '<span>By: ' + dev_name + '</span>' +
                        '<br><span>' + category + '</span>' +
                        '</div>' + '</div>'

                    $("#app-goes-here").append("<div style='cursor:pointer' id='" + id + "'>" + codeString + "</div>");
                    addAppsListener(id);
                })
            })
    }
    displayAllApps();

    /**
     * Redirects to the app-info page, the page is different for every apps document.
     * 
     * @param {*} id is the apps collection id
     */
    function addAppsListener(id) {
        document.getElementById(id)
            .addEventListener("click", function () {
                console.log(id + "was clicked!")
                window.location.href = "app-info.html?id=" + id; // Redirect page when click
            });
    }



});