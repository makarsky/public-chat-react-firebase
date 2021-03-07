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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import MoodIcon from '@material-ui/icons/Mood';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';
import { mainListItems } from './modules/main/components/drawerListItems';
import { config } from './config';
import MessageList from './modules/main/components/MessageList';
import MessageFormContainer from './modules/main/components/MessageFormContainer';
import AuthState from './modules/main/interfaces/AuthState';

const App = (): any => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    firebase.auth().signInAnonymously();
  }, []);

  return (
    <div className='app'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit'>
            Emoji Chat
          </Typography>
          <Box color='inherit' clone m={1}>
            <MoodIcon />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} className='app-drawer' onClose={handleDrawerClose}>
        <div className='app-drawer-close-icon'>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Box color='inherit' clone p={2}>
          <Typography component='h1' variant='h6' color='inherit'>
            Follow me for more!
          </Typography>
        </Box>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <FirebaseAuthProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...config}
        firebase={firebase}
      >
        <IfFirebaseAuthed>
          {({ user }: AuthState) => {
            console.log('IfFirebaseAuthed');
            return (
              <FirestoreProvider
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...config}
                firebase={firebase}
              >
                <MessageList user={user} />

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
    </div>
  );
};

export default App;
