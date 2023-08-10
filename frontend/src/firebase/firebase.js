import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';


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

export const app = initializeApp(firebaseConfig);
export const storage=getStorage();
export const db=getFirestore();
export const auth = getAuth();
