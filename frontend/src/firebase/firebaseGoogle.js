import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBR9AcB4nGxR0c-orbwgILDWDMrVKkcvAI",
    authDomain: "my-authentication-app-bda9e.firebaseapp.com",
    projectId: "my-authentication-app-bda9e",
    storageBucket: "my-authentication-app-bda9e.appspot.com",
    messagingSenderId: "540604133428",
    appId: "1:540604133428:web:0ce7f0389b91465afd1a61",
    measurementId: "G-DRH3R3Q2RV"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
 