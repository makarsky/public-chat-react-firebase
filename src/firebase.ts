import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
import config from './config/firebase';

class FirebaseProvider {
  auth: firebase.auth.Auth;

  firestore: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.auth.signInAnonymously();
  }

  signOut() {
    return this.auth.signOut();
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getUserUid() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }
}

export default new FirebaseProvider();
