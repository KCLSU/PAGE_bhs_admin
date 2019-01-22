import { config } from './config.js';


export function deleteArtist(key) {
  firebase.database().ref('/artists/' + key).remove();
  console.log("artist removed: " + key)
}
