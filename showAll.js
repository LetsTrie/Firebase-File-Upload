var DatabaseRef = firebase.database().ref('/StoringLink');



DatabaseRef.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {  
      var childData = childSnapshot.val();
      console.log(childData);
      document.querySelector("#Hi").innerHTML += 
      		"<div style= \"font-size: 30px;\"> <p> " + 
            "Name : " + childData.Name + "<br>" + 
            "Link : <button> <a href=" + childData.Link + "> Click Here </a> </button> <br>" +  
            "</p> </div> <hr>";
  });
});