import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBR9AcB4nGxR0c-orbwgILDWDMrVKkcvAI",
  authDomain: "my-authentication-app-bda9e.firebaseapp.com",
  projectId: "my-authentication-app-bda9e",
  storageBucket: "my-authentication-app-bda9e.appspot.com",
  messagingSenderId: "540604133428",
  appId: "1:540604133428:web:0ce7f0389b91465afd1a61",
  measurementId: "G-DRH3R3Q2RV"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth ;