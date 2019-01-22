import { config } from './config.js';


export function deleteArtist(data) {
  firebase.database().ref('/artists/' + data.key).remove();
}
