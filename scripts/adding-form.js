$(document).ready(function() {

    var docAppID;
    const fileInput = document.getElementById("icon");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2
    var file;
    var storageRef;

    function getApp() {
        document.getElementById("submit").addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                // user choice in the adding form (application or idea)
                var application = document.getElementById("app").checked;
                var idea = document.getElementById("idea").checked;

                //value from text field.
                var n = document.getElementById("name").value;
                var dn = document.getElementById("devname").value;
                var desc = document.getElementById("desc").value;
                var version = document.getElementById("version").value;
                var date = document.getElementById("date").value;
                var category = document.getElementById("cate").value;
                var link = document.getElementById("link").value;
                
                //test if the value is successfully get
                console.log(n);
                console.log(dn);
                console.log(desc);
                console.log(version);
                console.log(date);
                console.log(category);
                console.log(link);
                console.log(application);
                console.log(idea);

                db.collection("apps")
                    .doc(docAppID).update({
                        "name": n, //from text field
                        "application": application,
                        "idea": idea,
                        "dev_name": dn,
                        "version": version,
                        "date": date,
                        "category": category,
                        "link": link,
                        "description": desc,
                    })
                    .then(function(){
                        uploadIconPic();
                    })
                    // .then(function() {
                    //     redirectToSuccess(); // Redirect only the app is submit
                    // })

            })

        })
    }
    getApp();

    function makeApp(){
        window.addEventListener('load', (event) => {
            db.collection("apps").add({
            })
            .then(function(doc){
                docAppID = doc.id;
                console.log("app id!" + docAppID);
            })
          });
    }
    makeApp()

    function showIconPicture(){
        // listen for file selection
        fileInput.addEventListener('change', function(e){        //event listener
            file = e.target.files[0];
            var blob = URL.createObjectURL(e.target.files[0]);
            image.src = blob;    //change DOM image

            //store using this name
            storageRef = storage.ref("images/" + docAppID + "icon.jpg"); 

            storageRef.put(file) 
                        .then(function(){
                            console.log('Uploaded to Cloud Storage.');
                        })
        })
    }
    showIconPicture();
    // function redirectToSuccess() {
    //     window.location.href = "completely-added.html"
    // }

    function uploadIconPic() {
        storageRef.getDownloadURL()
            .then(function (url) {   // Get URL of the uploaded file
                console.log(url);    // Save the URL into users collection
                db.collection("apps").doc(docAppID).update({
                    "IconPic": url
                })
                .then(function(){
                    console.log('Added Icon Pic URL to Firestore.');
                })
            })
    }
});