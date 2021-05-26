import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import DefaultAppBar from '../components/DefaultAppBar';
import UserDataProvider from '../components/UserDataProvider';
import MessageForm from '../components/MessageForm';
import MessageListContainer from '../components/MessageListContainer';
import User from '../interfaces/User';
import UserData from '../interfaces/UserData';

interface DefaultLayoutProps {
  user: User;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isSoundOn: boolean;
  setSoundOn: (value: boolean) => void;
  playSound: () => void;
}

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
  user,
  isDarkMode,
  setIsDarkMode,
  isSoundOn,
  setSoundOn,
  playSound,
}: DefaultLayoutProps) => (
  <Box display='flex' flexDirection='column' className='app'>
    <DefaultAppBar
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      isSoundOn={isSoundOn}
      setSoundOn={setSoundOn}
    />
    <MessageListContainer
      user={user}
      isSoundOn={isSoundOn}
      playSound={playSound}
    />
    <UserDataProvider
      user={user}
      renderChildren={(userData: UserData, isLoading: boolean) => (
        <MessageForm userData={userData} isLoading={isLoading} />
      )}
    />
  </Box>
);

export default DefaultLayout;
