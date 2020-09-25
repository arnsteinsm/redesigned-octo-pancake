import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAa4XjZJq1BncZvssHcEil6I6PPvjJD_4E',
  authDomain: 'hervik-dash.firebaseapp.com',
  databaseURL: 'https://hervik-dash.firebaseio.com',
  projectId: 'hervik-dash',
  storageBucket: 'hervik-dash.appspot.com',
  messagingSenderId: '410026709484',
  appId: '1:410026709484:web:27b7f674d1bc391b8b30c9',
  measurementId: 'G-ZYZH3WDXEY',
};
firebase.initializeApp(config);

export default firebase;
