$(document).ready(function() {

    function addWebcamListener(id) {
        document.getElementById(id)
            .addEventListener("click", function() {
                var id = doc.id;
                console.log(id + "was clicked!")
                    //window.location.href="details.html";
                    //when we redirect, tack on after "?" the id of the webcam
                window.location.href = "app-info.html?id=" + id;
            });
    }

});