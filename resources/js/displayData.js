import { config } from './config.js'
import { updateArtist } from './updateArtist.js'
import { deleteArtist } from './deleteArtist.js'
import { uploadNewImage } from './uploadNewImage.js'

var db = firebase.database();
var ref = db.ref("artists");
const artistNames = [];

// DOM SELECTIONS
const upcoming = document.getElementById('upcoming-list');
const filmmakers = document.getElementById('filmmakers-list');
const musicians = document.getElementById('musicians-list');
const photographers = document.getElementById('photographers-list');
const artists = document.getElementById('artists-list');
const poets = document.getElementById('poets-list');
const grid = document.getElementById('grid-area');
const popup = document.querySelectorAll('.popup-container')[0];

console.log("UOPDATED VERSION ----------------")

//CREATE DATA VARIABLES
let image, category, name, description, facebook, twitter, instagram, website, key, newFile;

//FETCH DATA FROM FIREBASE
function loadArtists(){

  ref.orderByChild("name").on("child_added", function(snapshot) {
    artistNames.push(snapshot.val().name);
    let data = snapshot.val();
    let artistName = snapshot.val().name;
    let type = snapshot.val().type;
    let li = document.createElement('li');
    li.classList.add('artist')
    li.innerHTML = artistName;
    switch(type){
      case "upcoming" :
        upcoming.appendChild(li);
      break;
      case "filmmakers" :
        filmmakers.appendChild(li);
      break;
      case "musicians" :
        musicians.appendChild(li);
      break;
      case "photographers" :
        photographers.appendChild(li);
      break;
      case "artists" :
        artists.appendChild(li);
      break;
      case "poets" :
        poets.appendChild(li);
      break;
      default: console.log("Artist does not fall into category")

    }

    li.addEventListener('click', function editArtist(){
      image = data.url;
      category = type;
      name = data.name;
      description = data.description
      facebook = data.facebook;
      twitter = data.twitter;
      instagram = data.instagram;
      website = data.website;
      key = snapshot.key;
      updatePopup()
    });

  });

}

function updatePopup(){
  clearUploadedImage()
  document.getElementById('edit-name').value = name;
  document.getElementById('edit-description').value = description;
  // document.getElementById('edit-image').value = image;
  document.getElementById('edit-facebook').value = facebook;
  document.getElementById('edit-twitter').value = twitter;
  document.getElementById('edit-instagram').value = instagram;
  document.getElementById('edit-website').value = website;
  document.getElementById('edit-type').innerHTML = category;


  if (!popup.classList.contains('active')){
    popup.classList.add('active');
  }

  const newUploadInput = document.getElementById('new-file-select');
  newUploadInput.addEventListener("change", function(e){
    console.log(e.target.files);
    newFile = e.target.files[0];
  })

}

function prepareToDelete(key){
  console.log("delete artist")
  deleteArtist(key);
  hidePopUp()
  document.querySelectorAll('.artist').forEach(name => name.remove());
  loadArtists();
}

document.getElementById('update').addEventListener('click', prepareToUpdate);
document.getElementById('delete').addEventListener('click', prepareToDelete);

function clearUploadedImage(){
  document.getElementById('new-file-select').value = ''
  newFile = null;
}

function prepareToUpdate(){
  clearUploadedImage()

  category = document.getElementById('edit-artist-type').value
  name = document.getElementById('edit-name').value;
  description = document.getElementById('edit-description').value ;
  facebook = document.getElementById('edit-facebook').value;
  instagram = document.getElementById('edit-instagram').value;
  twitter = document.getElementById('edit-twitter').value;
  website = document.getElementById('edit-website').value;

//CREATE OBJECT TO PASS TO UPDATE FUNCTION
  let data = {
    category, image, key, name, description, facebook, instagram, website, twitter
  }

//IF AN IMAGE HAS BEEN UPLOADED
  if(newFile){
    const promise = new Promise((resolve, reject) =>{
        let fileName = newFile.name;
        //load image to database and reset-image url
        image = uploadNewImage(newFile, fileName, data);
        console.log("image uploaded")
        data.image = image
        // resolve(image)
    });

    promise.then(function(error, response, status){
      if (error){
        console.log("Error in promise once resolved "+ error);
        reject(error);
      }
      else{
        console.log("about to write data WITHIN promise")
        console.log(data)
        updateArtist(data)
      }
    });
  }

  else if (!newFile){
   updateArtist(data)
  }

  else {
    console.log("Error")
  }

  hidePopUp()
  document.querySelectorAll('.artist').forEach(name => name.remove());
  loadArtists();
};

function hidePopUp(){
  if (popup.classList.contains('active')){
    popup.classList.remove('active');
  }
  clearUploadedImage()
}

document.getElementById('hidePopup').addEventListener('click', hidePopUp);

loadArtists();
