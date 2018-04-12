import firebase from '../scripts/firebase';
import axios from '../scripts/axios';

const auth = {
  login(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  },
  logout() {
    return firebase.auth().signOut();
  },
  resetPassword(user) {
    return firebase.auth().sendPasswordResetEmail(user.email);
  },
  getUser(firebaseUID) {
    return axios.post('/api/auth/login', { firebaseUID });
  },
  updateUser(user) {
    return axios.post('/api/auth/updateUser', user);
  },
};

export default auth;
