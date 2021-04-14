/* function ShowCollection() {
    db.collection("test")
        .get() //get whole collection
        .then(function(snap) {
            snap.forEach(function(doc) { //cycle thru each doc 
                // do something with each document
                var pic = doc.data().picture; //key "picture"
                var title = doc.data().name; //key "name"

                // construct the string for card
                var codestring = '<div>' +
                    '<img src="images/' + pic + '" class="card-img-top">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + title + '</h5>' +
                    '<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
                    '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>' +
                    '</div>';
                // append with jquery to DOM
                $("#review").append(codestring);
            })
        })
}
showCollection();/*/

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
                console.log(name);
                //var geo_area = doc.data().fields.geo_local_area;
                //var coord = doc.data().fields.geom.coordinates; //know your json data
                //var url = doc.data().fields.url;
                $("#app-name").text(name);
                $("#dev-name").text(devname);
                //$("#details-go-here").append("<h1> " + geo_area + "</h1>");
                //$("#details-go-here").append("<h1> " + coord + "</h1>");
                //$("#details-go-here").append("<a href='" + url + "' > " + url);
                // var likeid = "like" + id;
                //$("#details-go-here").append("<h1 id='" + likeid + "' > CLICK HERE TO LIKE </h1>");
                //addLikeListener(id, likeid);
            })
    }
    getDetails();

    function getReview() {
        document.getElementById("submit").addEventListener('click', function() {

            const parsedUrl = new URL(window.location.href);
            console.log(parsedUrl.searchParams.get("id")); // "123"
    
            // extract id from url, assign to variable
            var id = parsedUrl.searchParams.get("id");
            console.log(id + " is id");

            firebase.auth().onAuthStateChanged(function(user) {
                var reviewDesc = document.getElementById("reviewDesc").value;

                db.collection("reviews")
                    .add({
                        "review_description": reviewDesc,
                    })

            })

        })
    }
    getReview();
})