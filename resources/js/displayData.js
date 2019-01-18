import { config } from './config.js'
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


function loadArtists(){

  ref.orderByChild("name").on("child_added", function(snapshot) {
    console.log("List all the Achilles")
    console.log("snapshot key: " + snapshot.key);
    artistNames.push(snapshot.val().name);
    console.log("data snapshot");
    let data = snapshot.val();
    console.log(data)
    let key = snapshot.key;
    let name = snapshot.val().name;
    let type = snapshot.val().type;
    let li = document.createElement('li');
    li.innerHTML = name;
    li.addEventListener('click', editArtist)

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

    function editArtist(){
      console.log("supplied data: ")
      console.log(data)
      let popUp = `
        <div class="popup">
          <i class="fas fa-times" onclick="hidePopUp()"></i>
          <div data-key=${key} class="artist-info">
            <input val=${data.name} id="name" placeholder= "Name..">
            <input val=${data.description} id="edit-description" >
            <input val=${data.facebook} id="edit-facebook" >
            <input val=${data.twitter} id="edit-twitter" >
            <input val=${data.instagram} id="edit-instagram" >
            <input val=${data.website} id="edit-website" >
          </div>
          <div class="button">
            <a class="update-button"> Update</a>
            <a class="delete-button"> Delete </a>
          </div>
        </div>
        `
        //
        // <a class="update-button" onclick="updateArtist(${data})"> Update</a>
        // <a class="delete-button" onclick="deleteArtist(${key})"> Delete </a>



        // function deleteArtist(key){
        //
        // }
        //
        // function updateArtist(data){
        //
        // }
        //
        // function hidePopUp(){
        //
        // }
          let div = document.createElement('div');
          div.classList.add("popup-container")
          div.innerHTML = popUp;
          grid.appendChild(div);

    }

  });



  console.log(artistNames);

}

loadArtists();
