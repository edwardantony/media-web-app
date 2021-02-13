import firebase from 'firebase';
import 'firebase/storage'
const config = {
  apiKey: 'AIzaSyBUCN5Pv87l2X3OkELOAYrhYdE55nQw4G0',
  authDomain: 'sabhatv-ms-dev.firebaseapp.com',
  projectId: 'sabhatv-ms-dev',
  storageBucket: 'sabhatv-ms-dev.appspot.com',
  messagingSenderId: '35862631502',
  appId: '1:35862631502:web:2e1a26806b64232ccf1f1f',
  measurementId: 'G-TC1KSLP170',
};

export const fireDb = firebase.initializeApp(config);
export const storage = firebase.storage();
export const fireDbAuth = fireDb.auth();
export default fireDb.database().ref();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
