import { config } from './config.js';

export function writeArtistData(data) {
  // var postKey = firebase.database().ref('artists/').child(data.key).push().key;
  var updates = {};

  var updateData = {
    type: data.category,
    url: data.image,
    name: data.name,
    description: data.description,
    twitter: data.twitter,
    facebook: data.facebook,
    instagram: data.instagram,
    website: data.website
  };
  updates['/artists/' + data.key] = updateData;
  firebase.database().ref().update(updates);
}
