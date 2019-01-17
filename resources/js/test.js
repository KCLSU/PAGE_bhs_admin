ref.orderByChild("name").on("child_added", function(snapshot) {
  console.log("List all the Achilles")
  console.log(snapshot.key);
  let name = snapshot.val().name;
  let li = document.createElement('li');
  li.innerHTML = name;
  upcoming.appendChild(li);

});


}
