import { config } from './config.js'
var db = firebase.database();
var ref = db.ref("artists");
ref.orderByChild("name").equalTo("Achilles").on("child_added", function(snapshot) {
  console.log("List all the Achilles")
  console.log(snapshot.key);
  console.log(snapshot.key.name);
  console.log(snapshot.key[0]);
  console.log(snapshot.val());
  // snapshot.forEach(function(data) {
  //   console.log(data)
  //   // console.log(`${data.name} has a twitter handle of ${data.twitter}. He has been described as: ${data.description}`)
  // })
});
