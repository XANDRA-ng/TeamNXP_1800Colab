function ShowCollection(){
    db.collection("test")
		.get()    //get whole collection
    .then(function(snap){
        snap.forEach(function(doc){          //cycle thru each doc 
            // do something with each document
            var pic = doc.data().picture;   //key "picture"
            var title = doc.data().name;    //key "name"
            
            // construct the string for card
            var codestring = '<div>'+
            '<img src="images/' + pic + '" class="card-img-top">'+
            '<div class="card-body">'+
            '<h5 class="card-title">' + title + '</h5>'+
            '<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>'+
            '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>'+
            '</div>';
            // append with jquery to DOM
            $("#review").append(codestring);
        })
    })
}
showCollection();