import firebase from 'firebase/app'
const config = {
  apiKey: "AIzaSyD0N2Ji7oYg-xmas1VoI__FnIwRyF3R5DU",
  authDomain: "cambola-001.firebaseapp.com",
  databaseURL: "https://cambola-001-default-rtdb.firebaseio.com",
  projectId: "cambola-001",
  storageBucket: "cambola-001.appspot.com",
  messagingSenderId: "598449602669",
  appId: "1:598449602669:web:0e664d3aef1da1e1fd3f64"
  
};
firebase.initializeApp(config);
export default firebase;