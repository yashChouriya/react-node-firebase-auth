const firebase = require('firebase-admin');

// firebase account setup

const serviceAccount = require('../config/myauth.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://my-authentication-app-bda9e.firebaseio.com'
});

const db = firebase.firestore();
module.exports={firebase};