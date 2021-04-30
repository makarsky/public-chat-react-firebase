import React, {
  useRef,
  useState,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Chip, Slide } from '@material-ui/core';
import PinnedMessage from './PinnedMessage';
import { MessageCollectionProviderMemorized } from './MessageCollectionProvider';
import CachedMessageCollectionProvider from './CachedMessageCollectionProvider';
import MessageList from './MessageList';
import User from '../interfaces/User';
import Message from '../interfaces/Message';

const audio = new Audio('/new_message.mp3');

interface MessageListContainerProps {
  user: User;
}

const MessageListContainer: FunctionComponent<MessageListContainerProps> = ({
  user,
}: MessageListContainerProps) => {
  const chatBottomRef = useRef() as MutableRefObject<HTMLSpanElement>;
  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [haveNewMessages, setHaveNewMessages] = useState(false);

  const scrollDown = () => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const onNewMessage = () => {
    audio.play();

    if (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
      chatRef?.current?.clientHeight + chatRef?.current?.clientHeight / 2
    ) {
      scrollDown();
    } else {
      setHaveNewMessages(true);
    }
  };

  const chipClickHandler = () => {
    setHaveNewMessages(false);
    scrollDown();
  };

  const onScroll = () => {
    if (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
        chatRef?.current?.clientHeight + chatRef?.current?.clientHeight * 0.3 &&
      haveNewMessages
    ) {
      setHaveNewMessages(false);
    }
  };

  return (
    <div
      className='app-message-list-container'
      ref={chatRef}
      onScroll={onScroll}
    >
      {/* <audio ref="audio_tag" src='new_message.mp3' style={{display: 'none'}} autoPlay> */}
      <PinnedMessage />
      <MessageCollectionProviderMemorized
        renderChildren={(messages: Message[], isLoading: boolean) => (
          <>
            {!isLoading && (
              <Box>
                <CachedMessageCollectionProvider
                  currentUser={user}
                  messages={messages || []}
                  afterCachedMessagesAreRenderedCallback={onNewMessage}
                  scrollDown={scrollDown}
                  renderChildren={(cachedGroupedMessages: Message[][]) => (
                    <MessageList
                      user={user}
                      groupedMessages={cachedGroupedMessages}
                    />
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
      <Slide direction='up' in={haveNewMessages} mountOnEnter unmountOnExit>
        <Box
          position='sticky'
          bottom='18px'
          display='flex'
          justifyContent='center'
        >
          <Chip label='You have new messages' onClick={chipClickHandler} />
        </Box>
      </Slide>
    </div>
  );
};

export default MessageListContainer;
