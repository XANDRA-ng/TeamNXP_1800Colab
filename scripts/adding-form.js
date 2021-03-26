/*
const form = document.querySelectorAll("#name");
submit = form[0].querySelector('input[type="submit"]');

function addingApp() {

    var app = new FormData(form[0]);

    var app = db.collection("apps");
    app.add({
        appName: app.get('#name'),
        devName: app.get('#devname')
    });
};

document.addEventListener('DOMLoaded', function(){
    submit.addEventListener('click', addingApp, false);
});


