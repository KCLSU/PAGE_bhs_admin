function writeArtistData(data) {
  firebase.database().ref('artists/' + data.key).set({
    type: data.category,
    url: data.image,
    name: data.name,
    description: data.description,
    twitter: data.twitter,
    facebook: data.facebook,
    instagram: data.instagram,
    website: data.website
  });
}
