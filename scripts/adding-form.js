$(document).ready(function () {

    /** Is the created apps document's ID */
    var docAppID;

    /** Where to get the icon image */
    const fileInput = document.getElementById("icon");

    /** Where to preview the icon image */
    const image = document.getElementById("mypic-goes-here");

    /** Is the icon image */
    var file;

    /** Where to store the icon image */
    var storageRef;

    /**
     * Updates the apps document to include all the information to be stored It also usesthe uploadIconPic()
     * function to update the icon pic to the document and send the user to the completely-added.html .
     */
    function getApp() {
        document.getElementById("submit").addEventListener('click', function () {
            firebase.auth().onAuthStateChanged(function (user) {
                // User choice in the adding form (application or idea).
                var application = document.getElementById("app").checked;
                var idea = document.getElementById("idea").checked;

                // Value from text field.
                var n = document.getElementById("name").value;
                var dn = document.getElementById("devname").value;
                var desc = document.getElementById("desc").value;
                var version = document.getElementById("version").value;
                var date = document.getElementById("date").value;
                var category = document.getElementById("cate").value;
                var link = document.getElementById("link").value;

                // Test if the value is successfully get.
                console.log(n);
                console.log(dn);
                console.log(desc);
                console.log(version);
                console.log(date);
                console.log(category);
                console.log(link);
                console.log(application);
                console.log(idea);

                // Updates the apps document.
                db.collection("apps")
                    .doc(docAppID).update({
                        "name": n,
                        "application": application,
                        "idea": idea,
                        "dev_name": dn,
                        "version": version,
                        "date": date,
                        "category": category,
                        "link": link,
                        "description": desc,
                    })
                    // Does the uploadIconPic() function.
                    .then(function () {
                        uploadIconPic();
                    })
            })
        })
    }
    getApp();

    /**
     * Makes the apps document on page start up. Just a shoddy way of doing this, could be better.
     * When reloading the page it will make a new apps document that is empty and undefined.
     */
    function makeApp() {
        window.addEventListener('load', (event) => {
            db.collection("apps").add({})
                .then(function (doc) {
                    docAppID = doc.id;
                    console.log("app id!" + docAppID);
                })
        });
    }
    makeApp()

    /**
     * Shows a preview of the app icon and puts that icon into the firebase storage.
     */
    function showIconPicture() {
        // Listen for file selection.
        fileInput.addEventListener('change', function (e) {
            file = e.target.files[0];
            var blob = URL.createObjectURL(e.target.files[0]);
            // Change DOM image.
            image.src = blob;

            // Store using this name.
            storageRef = storage.ref("images/" + docAppID + "icon.jpg");

            storageRef.put(file)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');
                })
        })
    }
    showIconPicture();

    /**
     * Redirects to the completely-added.html .
     */
    function redirectToSuccess() {
        window.location.href = "completely-added.html"
    }

    /**
     * Updates the apps document to include the link of the icon image. Does the redirectToSuccess() function as well.
     */
    function uploadIconPic() {
        storageRef.getDownloadURL()
            // Get URL of the uploaded file
            .then(function (url) {
                console.log(url);
                // Save the URL into apps document
                db.collection("apps").doc(docAppID).update({
                        "IconPic": url
                    })
                    .then(function () {
                        console.log('Added Icon Pic URL to Firestore.');
                        redirectToSuccess();
                    })
            })
    }
});