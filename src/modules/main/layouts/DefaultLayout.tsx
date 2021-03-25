import React, { FunctionComponent } from 'react';
import DefaultAppBar from '../components/DefaultAppBar';
import MessageList from '../components/MessageList';
import MessageFormContainer from '../components/MessageFormContainer';
import DefaultLayoutProps from '../interfaces/DefaultLayoutProps';
import RateLimitProvider from '../components/RateLimitProvider';
import RateLimit from '../interfaces/RateLimit';

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
  user,
}: DefaultLayoutProps) => (
  <div className='app'>
    <DefaultAppBar />
    <MessageList user={user} />
    <RateLimitProvider
      user={user}
      renderChildren={(rateLimit: RateLimit, isLoading: boolean) => (
        <MessageFormContainer
          user={user}
          rateLimit={rateLimit}
          isLoading={isLoading}
        />
      )}
    />
  </div>
);

export default DefaultLayout;
