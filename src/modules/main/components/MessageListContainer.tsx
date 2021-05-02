import React, {
  useRef,
  useState,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Chip, Slide } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PinnedMessage from './PinnedMessage';
import { MessageCollectionProviderMemorized } from './MessageCollectionProvider';
import CachedMessageCollectionProvider from './CachedMessageCollectionProvider';
import MessageList from './MessageList';
import User from '../interfaces/User';
import Message from '../interfaces/Message';

let cachedScrollTop = 0;
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
  const [isScrollButtonShown, setIsScrollButtonShown] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  const isAtTheBottom = () => {
    return (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
      chatRef?.current?.clientHeight + chatRef?.current?.clientHeight * 0.3
    );
  };

  const scrollDown = () => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const onNewMessage = () => {
    audio.play();

    if (isAtTheBottom()) {
      scrollDown();
    } else {
      setHaveNewMessages(true);
      setIsScrollButtonShown(true);
    }
  };

  const chipClickHandler = () => {
    setIsScrollButtonShown(false);
    setIsScrollingDown(true);
    scrollDown();
  };

  const onScroll = () => {
    if (isAtTheBottom()) {
      setHaveNewMessages(false);
      setIsScrollButtonShown(false);
      setIsScrollingDown(false);
      cachedScrollTop = 0;
      return;
    }

    if (
      !haveNewMessages &&
      !isScrollingDown &&
      (cachedScrollTop === 0 || chatRef?.current?.scrollTop < cachedScrollTop)
    ) {
      cachedScrollTop = chatRef?.current?.scrollTop;
      setIsScrollButtonShown(false);
      return;
    }

    if (
      !isScrollingDown &&
      cachedScrollTop + 50 < chatRef?.current?.scrollTop
    ) {
      cachedScrollTop = chatRef?.current?.scrollTop - 50;
      setIsScrollButtonShown(true);
    }
  };

  return (
    <>
      <div
        className='app-message-list-container'
        ref={chatRef}
        onScroll={onScroll}
      >
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
      </div>
      <Box
        position='relative'
        display='flex'
        justifyContent='center'
        height='0'
      >
        <Slide
          direction='up'
          in={isScrollButtonShown}
          mountOnEnter
          unmountOnExit
        >
          <Box position='absolute' bottom='18px'>
            <Chip
              label={
                <Box display='flex' alignItems='center'>
                  {haveNewMessages && 'You have new messages'}
                  <ExpandMore />
                </Box>
              }
              onClick={chipClickHandler}
            />
          </Box>
        </Slide>
      </Box>
    </>
  );
};

export default MessageListContainer;
