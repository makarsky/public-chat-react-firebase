import React, { useState, useEffect, FunctionComponent } from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import firebaseProvider from './firebase';
import DefaultLayout from './modules/main/layouts/DefaultLayout';
import Loader from './modules/main/layouts/Loader';

const App: FunctionComponent = () => {
  const [user] = useAuthState(firebaseProvider.auth);
  const [isDarkMode, setIsDarkMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)'),
  );

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => setIsDarkMode(prefersDarkMode), [prefersDarkMode]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
          primary: {
            light: isDarkMode ? '#616161' : '#2c387e',
            main: isDarkMode ? '#424242' : '#3f51b5',
            dark: isDarkMode ? '#1976d2' : '#fffde7',
          },
          secondary: {
            light: isDarkMode ? '#616161' : '#2c387e',
            main: isDarkMode ? '#ffee58' : '#5c6bc0',
            dark: isDarkMode ? '#353535' : '#fff',
          },
          background: {
            default: isDarkMode ? '#212121' : '#e8eaf6',
          },
        },
      }),
    [isDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      {user ? <DefaultLayout user={user} /> : <Loader />}
    </ThemeProvider>
  );
};

export default App;
