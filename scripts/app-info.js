//--------------------------------------------------------------------------

// use this ID to read from firestore
$(document).ready(function() {
    function getDetails() {
        // https://some.site/?id=123
        const parsedUrl = new URL(window.location.href);
        console.log(parsedUrl.searchParams.get("id")); // "123"

        // extract id from url, assign to variable
        var id = parsedUrl.searchParams.get("id");
        console.log(id + " is id");

        // use this ID to read from firestore
        db.collection("apps")
            .doc(id) //webcam ID that we extracted
            .get() //READ asynch
            .then(function(doc) { // display details!
                var name = doc.data().name;
                var devname = doc.data().dev_name;
                var category = doc.data().category;
                var link = doc.data().link;
                var version = doc.data().version;
                var date = doc.data().date;
                var description = doc.data().description;
                console.log(name);
                $("#app-name").text(name);
                $("#dev-name").text("By: " + devname);
                //$("#dev-name").text("By: " + devname);
                $("#category").text(category);
                $("#link").append("<a href='" + link + "' > " + link);
                $("#version").text("Version: " + version);
                $("#date").text("Release date: " + date);
                $("#description").text(description);
            })
    }
    getDetails();

    function getReviews() {
        document.getElementById("submit-button").addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                const parsedUrl = new URL(window.location.href);
                console.log(parsedUrl.searchParams.get("id")); // "123"

                // extract id from url, assign to variable
                var id = parsedUrl.searchParams.get("id");
                console.log(id + " this app id");

                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function(doc) {
                        var reviewer_name = doc.data().name;
                        var review = document.getElementById("review-type").value;
                        db.collection("apps")
                            .doc(id)
                            .collection("review")
                            .add({
                                "reviewer_name": reviewer_name, //from text field
                                "review-input": review, //from checkbox
                            })
                        console.log("review added" + review + reviewer_name);
                    })

            })
        })
    }
    getReviews();

    function getUserID() {
        firebase.auth().onAuthStateChanged(function(user) {
            // User is signed in.
            // Do something for the user here. 
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function(doc) {
                    var n = doc.data().name;
                    console.log(n + "get by function");
                })

        })
    }
    /**function getReview() {
        document.getElementById("submit").addEventListener('click', function() {

            const parsedUrl = new URL(window.location.href);
            console.log(parsedUrl.searchParams.get("id")); // "123"

            // extract id from url, assign to variable
            var id = parsedUrl.searchParams.get("id");
            console.log(id + " is id");

            firebase.auth().onAuthStateChanged(function(user) {
                var reviewDesc = document.getElementById("reviewDesc").value;
<<<<<<< HEAD

                db.collection("users")
                .doc(user.uid)
                .collection("reviews")
                .add({
                    "reviewText": reviewDesc   //from text field
                })

                // db.collection("reviews")
                //     .add({
                //         "review_description": reviewDesc,
                //     })
=======
                console.log(reviewDesc);
                db.collection("reviews")
                    .add({
                        "review_description": reviewDesc,
                    })
>>>>>>> 9f351ca2c821ca2443a84763988b8b984a28daaa

            })

        })
    }
    getReview();*/


});