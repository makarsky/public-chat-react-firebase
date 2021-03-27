import React, { FunctionComponent } from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseProvider from './firebase';
import DefaultLayout from './modules/main/layouts/DefaultLayout';
import Loader from './modules/main/layouts/Loader';

const App: FunctionComponent = () => {
  const [user] = useAuthState(firebaseProvider.auth);

  return user ? <DefaultLayout user={user} /> : <Loader />;
};

export default App;
