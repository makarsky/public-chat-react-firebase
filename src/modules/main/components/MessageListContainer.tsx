import React, {
  useRef,
  useState,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import PinnedMessage from './PinnedMessage';
import MessageCollectionProvider from './MessageCollectionProvider';
import CachedMessageCollectionProvider from './CachedMessageCollectionProvider';
import MessageList from './MessageList';
import DefaultLayoutProps from '../interfaces/DefaultLayoutProps';

const MessageListContainer: FunctionComponent<DefaultLayoutProps> = ({
  user,
}: DefaultLayoutProps) => {
  const chatBottomRef = useRef() as MutableRefObject<HTMLSpanElement>;
  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isFirstCollectionRendered, setIsFirstCollectionRendered] = useState(
    false,
  );

  const scrollDown = () => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const onNewMessage = () => {
    if (!isFirstCollectionRendered) {
      // This is the initial scroll.
      scrollDown();
      setIsFirstCollectionRendered(true);
    } else if (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
      chatRef?.current?.clientHeight + chatRef?.current?.clientHeight / 2
    ) {
      scrollDown();
    } else {
      // show tooltip "New messages" (clicking on it will scroll down)
    }
  };

  return (
    <div className='app-message-list-container' ref={chatRef}>
      <PinnedMessage />
      <MessageCollectionProvider
        renderChildren={(messages: Data[], isLoading: boolean) => (
          <>
            <Box>
              <CachedMessageCollectionProvider
                messages={messages || []}
                renderChildren={(cachedMessages: Data[]) => (
                  <>
                    {cachedMessages.length && (
                      <MessageList
                        user={user}
                        messages={cachedMessages}
                        afterMessageListIsRenderedCallback={onNewMessage}
                      />
                    )}
                  </>
                )}
              />
            </Box>
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
