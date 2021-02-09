import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyBUCN5Pv87l2X3OkELOAYrhYdE55nQw4G0',
  authDomain: 'sabhatv-ms-dev.firebaseapp.com',
  projectId: 'sabhatv-ms-dev',
  storageBucket: 'sabhatv-ms-dev.appspot.com',
  messagingSenderId: '35862631502',
  appId: '1:35862631502:web:2e1a26806b64232ccf1f1f',
  measurementId: 'G-TC1KSLP170',
};

// const config = {
//   apiKey: "AIzaSyAs47iOri1v74xJoI2ybABfBEqHEj7wSrs",
//   authDomain: "oldadmin-21613.firebaseapp.com",
//   projectId: "oldadmin-21613",
//   storageBucket: "oldadmin-21613.appspot.com",
//   messagingSenderId: "59029755112",
//   appId: "1:59029755112:web:cc28794dadbbfc1e3c655d",
//   measurementId: "G-E4RW0R519F"
// };
const fireDb = firebase.initializeApp(config);
export const fireDbAuth = fireDb.auth();
export default fireDb.database().ref();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
