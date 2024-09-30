import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

console.log("file config loaded");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzkl-E5YSwsjaku2AzcLmxL5e54bmjW7Q",
  authDomain: "musicly-2f1f7.firebaseapp.com",
  projectId: "musicly-2f1f7",
  storageBucket: "musicly-2f1f7.appspot.com",
  messagingSenderId: "257948260771",
  appId: "1:257948260771:web:c323532303b1fd19216216",
  measurementId: "G-W4DSM0L90C"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

const firestore = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

export { firebase, firestore, FieldValue };
