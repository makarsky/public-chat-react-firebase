export const config = {
  databaseURL: process.env.REACT_APP_FIRESTORE_DATABASE_URL as string,
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY as string,
  authDomain: process.env.REACT_APP_FIRESTORE_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_FIRESTORE_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_FIRESTORE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .REACT_APP_FIRESTORE_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_FIRESTORE_APP_ID as string,
  measurementId: process.env.REACT_APP_FIRESTORE_MEASUREMENT_ID as string,
};
