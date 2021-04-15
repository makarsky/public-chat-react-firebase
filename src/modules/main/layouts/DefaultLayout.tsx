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
}

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
  user,
}: DefaultLayoutProps) => (
  <Box display='flex' flexDirection='column' className='app'>
    <DefaultAppBar />
    <MessageListContainer user={user} />
    <UserDataProvider
      user={user}
      renderChildren={(userData: UserData, isLoading: boolean) => (
        <MessageForm userData={userData} isLoading={isLoading} />
      )}
    />
  </Box>
);

export default DefaultLayout;
