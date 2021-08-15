import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDepnzhqDz2hJTb9vH62tqIzNMOy_Z9560",
    authDomain: "mx-support.firebaseapp.com",
    projectId: "mx-support",
    storageBucket: "mx-support.appspot.com",
    messagingSenderId: "399039465924",
    appId: "1:399039465924:web:9a09a3cdca6c08f44c3c91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;