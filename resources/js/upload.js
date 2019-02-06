import { config } from './config.js';
firebase.initializeApp(config);


document.addEventListener('DOMContentLoaded', function(){

    const uploadButton = document.getElementById('upload-button');
    const uploadInput = document.getElementById('file-select');
    let progress = document.getElementById('progress');
    let progressState = document.getElementById('progress-state');

    // Initialize Firebase



    const query = firebase.database().ref();


  //UPLOAD
    var selectedFile;
    uploadInput.addEventListener("change", function(e){
      console.log(e.target.files);
      selectedFile = e.target.files[0];
    })



  //IMAGE UPLOAD AND STORAGE
  // Get a reference to the storage service, which is used to create references in your storage bucket


  uploadButton.addEventListener("click", uploadFile);

  function uploadFile(e){
    console.log("selected File")
    console.log(selectedFile)
    if (!selectedFile){
      progress.innerHTML =`<p class="fail"> No image uploaded!></p>`
      console.log("terminate function")
      return;
    }

    var storage = firebase.storage();
    var fileName = selectedFile.name;

    console.log(fileName);
    var storageRef = firebase.storage().ref('/f35s/' + fileName);
    var uploadTask = storageRef.put(selectedFile);
    var imageURL;

    //FETCH INPUTS
    let type = document.getElementById('artist-type').value;
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let facebook = document.getElementById('facebook').value;
    let twitter = document.getElementById('twitter').value;
    let instagram = document.getElementById('instagram').value;
    let website = document.getElementById('website').value;
    let upcomingEvent = document.getElementById('upcoming-event').value;

      // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      progress.innerHTML = `Upload is ${progress}% done`
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          progressState.innerHTML = 'Upload is paused'
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
            progressState.innerHTML = 'Upload is running'
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
        console.log("Upload unsuccessful")
        progressState.innerHTML = 'Upload unsuccessful'
    }, function() {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });

      //ADD METADATA TO REAL TIME DATABASE
      imageURL = uploadTask.snapshot.downloadURL;

      var postKey = firebase.database().ref('artists/').push().key;
      var updates = {};
      var postData = {
        type: type,
        url: imageURL,
        name: name,
        description: description,
        twitter: twitter,
        facebook: facebook,
        instagram: instagram,
        website: website,
        upcomingEvent: upcomingEvent
      }
      console.log(imageURL)

      updates['/artists/' + postKey] = postData;
      firebase.database().ref().update(updates)

      const allInputs = document.querySelectorAll('.add-form input');
      allInputs.forEach(input => input.value = '')
      });
      document.getElementById('file-select').value = '';
      progress.innerHTML = `<p class="success"> Upload Succesful </p> `
  }




});
