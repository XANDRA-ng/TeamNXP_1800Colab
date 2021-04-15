$(document).ready(function() {

    function getApp() {
        document.getElementById("submit").addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                var application = document.getElementById("app").checked;
                var idea = document.getElementById("idea").checked;

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
                console.log(application);
                console.log(idea);

                db.collection("apps")
                    .add({
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

            })

        })
    }
    getApp();

});