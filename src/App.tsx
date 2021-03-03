import React, { useEffect } from 'react';
import './App.css';
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
import { FirebaseAuthProvider, IfFirebaseAuthed } from '@react-firebase/auth';
import {
  FirestoreDocument,
  FirestoreProvider,
} from '@react-firebase/firestore';
import { config } from './config';
import MessageCollection from './modules/main/components/MessageCollection';
import MessageFormContainer from './modules/main/components/MessageFormContainer';

type AuthStateUser = { uid: string };
type AuthState = { user: AuthStateUser };

const App = (): any => {
  useEffect(() => {
    firebase.auth().signInAnonymously();
  }, []);

  return (
    <div className='app'>
      <main className='app-header'>
        <FirebaseAuthProvider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...config}
          firebase={firebase}
        >
          <IfFirebaseAuthed>
            {({ user }: AuthState) => {
              return (
                <FirestoreProvider
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...config}
                  firebase={firebase}
                >
                  <MessageCollection />

                  <FirestoreDocument path={`/users/${user.uid}`}>
                    {({ value, isLoading }) => {
                      return isLoading === false ? (
                        <MessageFormContainer
                          userUid={user.uid}
                          userData={value}
                        />
                      ) : (
                        'Loading user info...'
                      );
                    }}
                  </FirestoreDocument>
                </FirestoreProvider>
              );
            }}
          </IfFirebaseAuthed>
        </FirebaseAuthProvider>
      </main>
    </div>
  );
};

export default App;
