import React, { useRef, FunctionComponent, MutableRefObject } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import PinnedMessage from './PinnedMessage';
import MessageCollectionProvider from './MessageCollectionProvider';
import CachedMessageCollectionProvider from './CachedMessageCollectionProvider';
import MessageList from './MessageList';
import User from '../interfaces/User';

interface MessageListContainerProps {
  user: User;
}

const MessageListContainer: FunctionComponent<MessageListContainerProps> = ({
  user,
}: MessageListContainerProps) => {
  const chatBottomRef = useRef() as MutableRefObject<HTMLSpanElement>;
  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;

  const scrollDown = () => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const onNewMessage = () => {
    if (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
      chatRef?.current?.clientHeight + chatRef?.current?.clientHeight / 2
    ) {
      scrollDown();
    } else {
      // show tooltip "New messages" (clicking on it will scroll down)
    }
  };

  return (
    <div className='app-message-list-container' ref={chatRef} key='ytv'>
      <PinnedMessage />
      <MessageCollectionProvider
        renderChildren={(messages: Data[], isLoading: boolean) => (
          <>
            {!isLoading && (
              <Box>
                <CachedMessageCollectionProvider
                  messages={messages || []}
                  afterCachedMessagesAreRenderedCallback={onNewMessage}
                  onFirstRenderingCallback={scrollDown}
                  renderChildren={(cachedMessages: Data[]) => (
                    <>
                      {cachedMessages.length > 1 && (
                        <MessageList user={user} messages={cachedMessages} />
                      )}
                    </>
                  )}
                />
              </Box>
            )}
            {isLoading && (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='90%'
              >
                <CircularProgress color='inherit' />
              </Box>
            )}
          </>
        )}
      />
      <span ref={chatBottomRef} />
    </div>
  );
};

export default MessageListContainer;
