import firebase from '../scripts/firebase';
import axios from '../scripts/axios';

const auth = {
  login(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  },
  logout() {
    return firebase.auth().signOut();
  },
  getUser(firebaseUID) {
    return axios.post('/auth/login', { firebaseUID });
  },
};

export default auth;
