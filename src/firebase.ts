import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
// eslint-disable-next-line import/no-duplicates
import 'firebase/analytics';
import { config } from './config';

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

  // addQuote(quote) {
  //   if(!this.auth.currentUser) {
  //     return alert('Not authorized')
  //   }

  //   return this.firestore.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
  //     quote
  //   })
  // }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getUserUid() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }

  // async getUserLastMessageDate() {
  //   if (this.auth.currentUser) {
  //     const data = await this.firestore
  //       .doc(`users/${this.auth.currentUser.uid}`)
  //       .get();
  //     const rateLimitData = data.get('rateLimit');

  //     return rateLimitData?.lastMessage;
  //   }

  //   return null;
  // }

  // async getMessages() {
  //   if (this.auth) {
  //     const quote = await this.firestore
  //       .doc(`messages/${this.auth.currentUser.uid}`)
  //       .get();

  //     return quote.get('quote');
  //   }
  //   return [];
  // }
}

export default new FirebaseProvider();
