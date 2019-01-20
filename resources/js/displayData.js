import { config } from './config.js'
import { writeArtistData } from './edit.js'
import { uploadImage } from './newImage.js'

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

//EDIT ARTIST DETAILS
let image;
let category;
let name;
let description;
let facebook;
let twitter;
let instagram;
let website;
let key;
let newFile;

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

function deleteArtist(){
  console.log("delete artist")
}

document.getElementById('update').addEventListener('click', updateArtist);

function updateArtist(){
  console.log(image)

  console.log("selectedFile is: ")
  console.log(newFile)

  // if (newFile){
  //   let fileName = newFile.name;
  //   //load image to database and reset-image url
  //   image = uploadImage(newFile, fileName)
  //   console.log("image uploaded")
  // }

  category = document.getElementById('edit-artist-type').value
  name = document.getElementById('edit-name').value;
  description = document.getElementById('edit-description').value ;
  facebook = document.getElementById('edit-facebook').value;
  instagram = document.getElementById('edit-instagram').value;
  twitter = document.getElementById('edit-twitter').value;
  website = document.getElementById('edit-website').value;

  let data = {
    category, image, key, name, description, facebook, instagram, website, twitter
  }

  console.log("about to write data")
  console.log(data)

    writeArtistData(data)
    hidePopUp()
    document.getElementById('new-file-select').value = ''
    newFile = null;
    document.querySelectorAll('.artist').forEach(name => name.remove());
    loadArtists();

}

function hidePopUp(){
  if (popup.classList.contains('active')){
    popup.classList.remove('active');
  }
}

document.getElementById('hidePopup').addEventListener('click', hidePopUp);

loadArtists();
