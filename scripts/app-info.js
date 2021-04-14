//--------------------------------------------------------------------------

// use this ID to read from firestore
$(document).ready(function() {
    function getDetails() {
        // https://some.site/?id=123
        const parsedUrl = new URL(window.location.href);
        console.log(parsedUrl.searchParams.get("id")); // "123"

        // extract id from url, assign to variable
        var id = parsedUrl.searchParams.get("id");
        console.log(id);

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
                $("#description").text("Release date: " + description);
                //$("#details-go-here").append("<a href='" + url + "' > " + url);
                // var likeid = "like" + id;
                //$("#details-go-here").append("<h1 id='" + likeid + "' > CLICK HERE TO LIKE </h1>");
                //addLikeListener(id, likeid);
            })
    }
    getDetails();
})