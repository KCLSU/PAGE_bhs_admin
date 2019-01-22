import { config } from './config.js';


export function deleteArtist(key) {
  console.log("prepare to delete: " + key)
  firebase.database().ref('/artists/' + key).remove();
  console.log("artist removed: " + key)
}
