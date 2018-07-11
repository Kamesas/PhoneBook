import * as firebase from "firebase";

const FirebaseConfig = {
  	apiKey: "AIzaSyCLzHF5BzJFm7uI7KZ8ltf_7Abke0YFnis",
    authDomain: "react-redux-firebase-1-77d47.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-1-77d47.firebaseio.com",
    projectId: "react-redux-firebase-1-77d47",
    storageBucket: "",
    messagingSenderId: "765612653895"
};

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const firebaseContact = databaseRef.child("contacts");