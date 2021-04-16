$(document).ready(function () {

    /** the parsed url */
    const parsedUrl = new URL(window.location.href);

    /** extract id from url, assign to variable */
    var id = parsedUrl.searchParams.get("id");

    /**
     * Gets all the details from the apps document and puts the details to their respective id
     */
    function getDetails() {
        // use this ID to read from firestore
        db.collection("apps")
            .doc(id) //app ID that we extracted
            .get() //READ asynch
            .then(function (doc) {
                // display all the details for the app!
                var name = doc.data().name;
                var devname = doc.data().dev_name;
                var category = doc.data().category;
                var link = doc.data().link;
                var version = doc.data().version;
                var date = doc.data().date;
                var description = doc.data().description;
                var application = doc.data().application;
                var icon = doc.data().IconPic;
                console.log(name);
                $("#app-name").text(name);
                $("#dev-name").text("By: " + devname);
                $("#category").text(category);

                // If the application is true, return text "application", else "idea."
                if (application == true) {
                    $("#app-or-idea").text("application").css({
                        color: "white"
                    });
                } else {
                    $("#app-or-idea").text("idea").css({
                        color: "dimgray"
                    });
                }

                $("#icon-box").append("<img id='icon' src='" + icon + "' class='mx-auto d-block'>");
                $("#link").append("<a href='" + link + "' > " + link);
                $("#version").text("Version: " + version);
                $("#date").text("Release date: " + date);
                $("#description").text(description);

                // Show all the existence reviews, only call once.
                showReviews(id);
            })
    }
    getDetails();

    /**
     * Gets the reviews from the user and stores it on a collection called reviews stored in that app.
     */
    function getReviews() {
        document.getElementById("submit-button").addEventListener('click', function () {
            firebase.auth().onAuthStateChanged(function (user) {
                const parsedUrl = new URL(window.location.href);

                // extract id from url, assign to variable
                var id = parsedUrl.searchParams.get("id");

                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
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
                    .then(function () {
                        console.log("get one review")
                        showOneReview(id) // show only the newly added review
                    })

            })
        })
    }
    getReviews();

    /**
     * Gets all the reviews submitted by users and shows them on the respective div.
     */
    function showReviews(id) {
        db.collection("apps")
            .doc(id)
            .collection("review")
            .orderBy("reviewDate", "asc")
            .get()
            .then(function (snapCollection) {
                snapCollection.forEach(function (doc) {
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

    // show only the newly added review
    function showOneReview(id) {
        db.collection("apps")
            .doc(id)
            .collection("review")
            .orderBy("reviewDate", "desc").limit(1) //get only one review, sort according to the review date and time
            .get()
            .then(function (snapCollection) {
                snapCollection.forEach(function (doc) {
                    var display_review = doc.data().review_input; // Reviewer input 
                    var display_name = doc.data().reviewer_name; // Reviewer name
                    var display_date = doc.data().reviewDate; // the timestamp of the review

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