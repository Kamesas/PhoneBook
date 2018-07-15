import * as firebase from "firebase";

const FirebaseConfig = {
  	apiKey: "AIzaSyCLzHF5BzJFm7uI7KZ8ltf_7Abke0YFnis",
    authDomain: "react-redux-firebase-1-77d47.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-1-77d47.firebaseio.com",
    projectId: "react-redux-firebase-1-77d47",
    storageBucket: "react-redux-firebase-1-77d47.appspot.com",
    messagingSenderId: "765612653895"
};

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const firebaseContact = databaseRef.child("contacts");
export const storage = firebase.storage().ref(); //allow read, write: if request.auth != null;

// export default class Storage {
//   static displayFirebaseStorageImg(ref: string, callback: (url: string) => void) {
	
//   	// ex: storage/images/[userId]/avatar/avatar.jpg
//   	const imageRef = firebase.storage().ref(ref);
 
//   	imageRef.getDownloadURL().then((url: string) => {
//   		callback(url);
//   		console.log(url);
//   	});

//   }
// }