$(document).ready(function () {

    /**
     * Shows the user's name.
     */
    function sayHello() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // Change Login in the navbar to the user name. 
                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
                        var n = doc.data().name;
                        console.log(n);
                        document.getElementById("username").innerText = n;
                    })
            } else {
                // No user is signed in.
            }
        });
    }
    sayHello();


});