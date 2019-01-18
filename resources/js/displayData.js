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
      console.log("supplied data: ")
      console.log(data)
      let popUp = `
        <div class="popup">
          <i class="fas fa-times" onclick="hidePopUp()"></i>
          <div data-key=${key} class="artist-info">
          <select id="edit-artist-type">
            <option value="upcoming">upcoming</option>
            <option value="filmmakers">filmmakers</option>
            <option value="musicians">musicians</option>
            <option value="photographers">photographers</option>
            <option value="artists">fine artists</option>
            <option value="poets">spoken word</option>
          </select>
            <input value=${data.name} id="name" placeholder= "Name..">
            <input value=${data.description} id="edit-description" >
            <input value=${data.facebook} id="edit-facebook" >
            <input value=${data.twitter} id="edit-twitter" >
            <input value=${data.instagram} id="edit-instagram" >
            <input value=${data.website} id="edit-website" >
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
          let div = document.createElement('div');
          div.classList.add("popup-container")
          div.innerHTML = popUp;
          grid.appendChild(div);

          function hidePopUp(){
          let box = document.querySelectorAll('popup-container')[0];
          box.style.display = 'none'
          }
    }
)


  });



  console.log(artistNames);

}

loadArtists();
