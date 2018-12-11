import { config } from './config.js'
var db = firebase.database();
var ref = db.ref("artists");
const artistNames = [];


let upcoming = document.getElementById('upcoming-list')

ref.orderByChild("name").equalTo("Achilles").on("child_added", function(snapshot) {
  console.log("List all the Achilles")
  console.log(snapshot.key);
  artistNames.push(snapshot.val().name);
  let name = `${snapshot.val().name}`
   let li = document.createElement('li');
   li.innerHTML = name;
  upcoming.appendChild(li);

});

console.log(artistNames);
