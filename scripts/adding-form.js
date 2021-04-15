$(document).ready(function() {
    function getApp() {
        
        var n = document.getElementById("name").value;
        
        var fileInput = document.getElementById("iconInput");
        const image = document.getElementById("mypic-goes-here");

        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image

            //store using this name
            var storageRef = storage.ref("images/icon" + n + ".jpg"); 

            //upload the picked file
            storageRef.put(file) 
            .then(function(){
                console.log('Uploaded to Cloud Storage.');
            })
            
            storageRef.getDownloadURL()
                .then(function (url) {   // Get URL of the uploaded file
                    console.log(url);    // Save the URL into users collection
                    db.collection("users").doc(user.uid).update({
                        "profilePic": url
                    })
                    .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                    })
                })
        })

        document.getElementById("submit").addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                
                // var fileInput = document.getElementById("iconInput");
                // const image = document.getElementById("mypic-goes-here");

                // fileInput.addEventListener('change', function (e) {
                //     var file = e.target.files[0];
                //     var blob = URL.createObjectURL(file);
                //     image.src = blob;            // display this image
                // })
                
                var n = document.getElementById("name").value;
                var dn = document.getElementById("devname").value;
                var desc = document.getElementById("desc").value;
                var version = document.getElementById("version").value;
                var date = document.getElementById("date").value;
                var category = document.getElementById("cate").value;
                var link = document.getElementById("link").value;
                console.log(n);
                console.log(dn);
                console.log(desc);
                console.log(version);
                console.log(date);
                console.log(category);
                console.log(link);

                //store using this name
                var storageRef = storage.ref("images/" + n + ".jpg"); 

                //upload the picked file
                storageRef.put(file) 
                .then(function(){
                    console.log('Uploaded to Cloud Storage.');
                })

                //get the URL of stored file
                var icon = storageRef.getDownloadURL()
                // var icon = storageRef.getDownloadURL()

                db.collection("apps")
                    .add({
                        "name": n, //from text field
                        "dev_name": dn,
                        "version": version,
                        "date": date,
                        "category": category,
                        "link": link,
                        "description": desc,
                        "profilePic": url,
                        "icon": icon
                    })

                // var iconFileInput = document.getElementById("iconInput");   // pointer #1
                // const image = document.getElementById("mypic-goes-here"); // pointer #2

                // iconFileInput.addEventListener('change', function (e) {
                //     var iconFile = e.target.files[0];
                //     var blob = URL.createObjectURL(file);
                //     image.src = blob;            // display this image
        
                //     //store using this name
                //     var storageRef = storage.ref("images/" + user.uid + ".jpg"); 
                    
                //     //upload the picked file
                //     storageRef.put(iconFile) 
                //         .then(function(){
                //             console.log('Uploaded to Cloud Storage.');
                //         })
        
                //                 //get the URL of stored file
                //     storageRef.getDownloadURL()
                //         .then(function (url) {   // Get URL of the uploaded file
                //             console.log(url);    // Save the URL into users collection
                //         })
                // })
            })

        })
    }
    getApp();

    // function uploadUserProfilePic() {
    //     // Let's assume my storage is only enabled for authenticated users 
    //     // This is set in your firebase console storage "rules" tab
    
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         var fileInput = document.getElementById("iconInput");   // pointer #1
    //         const image = document.getElementById("mypic-goes-here"); // pointer #2
    
    //         // listen for file selection
    //         fileInput.addEventListener('change', function (e) {
    //             var file = e.target.files[0];
    //             var blob = URL.createObjectURL(file);
    //             image.src = blob;            // display this image
    
    //             //store using this name
    //             var storageRef = storage.ref("images/" + n + ".jpg"); 
                
    //             //upload the picked file
    //             storageRef.put(file) 
    //                 .then(function(){
    //                     console.log('Uploaded to Cloud Storage.');
    //                 })
    
    //                         //get the URL of stored file
    //             storageRef.getDownloadURL()
    //                 .then(function (url) {   // Get URL of the uploaded file
    //                     console.log(url);    // Save the URL into users collection
    //                     db.collection("users").doc(user.uid).update({
    //                         "profilePic": url
    //                     })
    //                     .then(function(){
    //                         console.log('Added Profile Pic URL to Firestore.');
    //                     })
    //                 })
    //         })
    //     })
    // }
    // uploadUserProfilePic()

});