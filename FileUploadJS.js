function post_now() {
	let myName 	= document.getElementById("NameID").value;
	let myFile 	= document.getElementById("FileID");
	let database = firebase.database();
	let storage  = firebase.storage();

	let uploadTask = storage.ref("CheckingStorage/" + new Date()).put(myFile.files[0]);

	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED:
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING:
	      console.log('Upload is running');
	      break;
	  }
	}, function(error) {
	      switch (error.code) {
	        case 'storage/unauthorized':
	          break;
	        case 'storage/canceled':
	          break;
	        case 'storage/unknown':
	          break;
	      }
	}, function() {
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		    console.log('File available at', downloadURL);
			var newPostKey = firebase.database().ref().child('StoringLink').push().key;

			firebase.database().ref('/StoringLink/' + newPostKey).set({
				Name : myName,
				Link : downloadURL
			}).then(function() {
				window.location = "ShowAll.html";
			});
		});
	});

}
