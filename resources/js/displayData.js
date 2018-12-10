import { config } from './config.js'
var db = firebase.database();
var ref = db.ref("artists");
ref.orderByChild("name").equalTo("Achilles").on("child_added", function(snapshot) {
  console.log("List all the Achilles")
  console.log(snapshot.key);
});
