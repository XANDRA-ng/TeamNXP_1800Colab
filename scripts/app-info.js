//--------------------------------------------------------------------------

// use this ID to read from firestore
$(document).ready(function() {

    const parsedUrl = new URL(window.location.href);
    // extract id from url, assign to variable
    var id = parsedUrl.searchParams.get("id");

    function getDetails() {
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
                var application = doc.data().application;
                console.log(name);
                $("#app-name").text(name);
                $("#dev-name").text("By: " + devname);
                $("#category").text(category);
                if (application == true) {
                    $("#app-or-idea").text("application").css({
                        borderRadius: "10pt",
                        backgroundColor: "rgb(90, 14, 45)"
                    });
                } else {
                    $("#app-or-idea").text("idea").css({
                        borderRadius: "10pt",
                        backgroundColor: "rgb(90, 14, 45)"
                    });
                }

                $("#link").append("<a href='" + link + "' > " + link);
                $("#version").text("Version: " + version);
                $("#date").text("Release date: " + date);
                $("#description").text(description);
                showReviews(id);
            })
    }
    getDetails();

    function getReviews() {
        document.getElementById("submit-button").addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                const parsedUrl = new URL(window.location.href);

                // extract id from url, assign to variable
                var id = parsedUrl.searchParams.get("id");

                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function(doc) {
                        var reviewer_name = doc.data().name;
                        var review = document.getElementById("review-type").value;
                        var postDate = new Date();
                        var dateString = postDate.toString();
                        //console.log(postDate);
                        db.collection("apps")
                            .doc(id)
                            .collection("review")
                            .add({
                                "reviewer_name": reviewer_name, //from text field
                                "review_input": review, //from checkbox
                                "reviewDate": dateString,
                            })
                        console.log("review added" + review + reviewer_name);
                    })
                    .then(function() {
                        console.log("get one review")
                        showOneReview(id)
                    })

            })
        })
    }
    getReviews();

    function showReviews(id) {
        db.collection("apps")
            .doc(id)
            .collection("review")
            .orderBy("reviewDate", "asc")
            .get()
            .then(function(snapCollection) {
                snapCollection.forEach(function(doc) {
                    var display_review = doc.data().review_input;
                    var display_name = doc.data().reviewer_name;
                    var display_date = doc.data().reviewDate;

                    //console.log(display_date);
                    var eachReview = '<div class="review-box">' +
                        '<h5 class="reviewer-name">' + display_name + '</h5>' +
                        '<p class="review-comment">' + display_review + '</p>' +
                        '<p class="review-date"><small class="text-muted">' + display_date +
                        '</small></p>'

                    $("#review").append("<div style='color:white' class='review-card'>" + eachReview + "</div>");
                })

            })

    }

    function showOneReview(id) {
        db.collection("apps")
            .doc(id)
            .collection("review")
            .orderBy("reviewDate", "desc").limit(1)
            .get()
            .then(function(snapCollection) {
                snapCollection.forEach(function(doc) {
                    var display_review = doc.data().review_input;
                    var display_name = doc.data().reviewer_name;
                    var display_date = doc.data().reviewDate;

                    //console.log(display_date);
                    var eachReview = '<div class="review-goes-here">' +
                        '<h5 class="reviewer-name">' + display_name + '</h5>' +
                        '<p class="review-comment">' + display_review + '</p>' +
                        '<p class="review-date"><small class="text-muted">' + display_date +
                        '</small></p>' + '</div>';

                    $("#review").append("<div style='color:white' class='review-card'>" + eachReview + "</div>");
                })

            })

    }






});