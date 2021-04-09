$(document).ready(function() {

    function getApp() {
        document.getElementById("submit").addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                var n = document.getElementById("name").value;
                var dn = document.getElementById("devname").value;
                var desc = document.getElementById("desc").value;
                console.log(n);
                console.log(dn);
                console.log(desc);

                db.collection("apps")
                    .add({
                        "name": n, //from text field
                        "dev_name": dn,
                        "description": desc
                    })

            })
        })
    }
    getApp();
});