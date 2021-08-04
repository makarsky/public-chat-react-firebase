import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
// eslint-disable-next-line import/no-duplicates
import 'firebase/analytics';
import config from './config/firebase';

class FirebaseProvider {
  auth: firebase.auth.Auth;

  firestore: firebase.firestore.Firestore;

  analytics: firebase.analytics.Analytics;

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.analytics = firebase.analytics();
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
