
const firebaseAdmin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require('../config/firebase.json');

firebase.config = {
  apiKey: 'AIzaSyAO6sIIK7fpCg_wHwjisKE8eBPC4E6shcs',
  authDomain: 'grade4us.firebaseapp.com',
  databaseURL: 'https://grade4us.firebaseio.com',
  projectId: 'grade4us',
  storageBucket: 'grade4us.appspot.com',
  messagingSenderId: '743172264344',
};
firebase.initializeApp(firebase.config);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://grade4us.firebaseio.com',
});

const firebaseHelper = {
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

module.exports = firebaseHelper;
