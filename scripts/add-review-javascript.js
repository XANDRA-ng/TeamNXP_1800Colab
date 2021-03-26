
// // Reference messages collection
// var textRef = firebase.database().ref('')
// // Listen for form submit
// document.getElementById('reviewForm').addEventListener('submit', submitForm);

// function submitForm(e){
//     e.preventDefault();

//     // Get values
//     var text = getInputVal('reviewText');

//     console.log(text);
// }

// // Function to get form values
// function getInputVal(id){
//     return document.getElementById(id).value;
// }

// // Init Firebase
// firebase.initializeApp(firebaseConfig);
// var firestore = firebase.firestore();

// Start grabbing our DOM Elements
const submitButton = document.querySelector('#submit');

let reviewText = document.querySelector('#reviewText')

// what video had: const db = firebase.collection('----');
// also had: var firestore = firebase.firestore();
// const rev = db.collection('reviews');

submitButton.addEventListener('click', function() {
    let reviewTextInput = reviewText.value;

    // Access the Database Collection
    db.doc()
        .set({
        text: reviewTextInput,
    })
    .then(function() {
        console.log('Data saved');
    })
    .catch(function(error) {
        console.log(error);
    });
});