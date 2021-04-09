
function getReviewInputs() {
    document.getElementById("submit").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {

            // get various values from the form
            var text = document.getElementById("reviewText").value;

            db.collection("users")
                .doc(user.uid)
                .collection("reviews")
                .add({
                    "reviewText": text   //from text field
                })
        })
    })
}
getReviewInputs();
