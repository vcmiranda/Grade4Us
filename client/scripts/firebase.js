import * as firebase from 'firebase';

firebase.config = {
  apiKey: 'AIzaSyAO6sIIK7fpCg_wHwjisKE8eBPC4E6shcs',
  authDomain: 'grade4us.firebaseapp.com',
  databaseURL: 'https://grade4us.firebaseio.com',
  projectId: 'grade4us',
  storageBucket: 'grade4us.appspot.com',
  messagingSenderId: '743172264344',
};

firebase.initializeApp(firebase.config);

export default firebase;
