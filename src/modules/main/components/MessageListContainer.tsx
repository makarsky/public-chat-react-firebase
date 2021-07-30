import React, {
  useRef,
  useState,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSSProperties } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import PinnedMessage from './PinnedMessage';
import { MessageCollectionProviderMemorized } from './MessageCollectionProvider';
import CachedMessageCollectionProvider from './CachedMessageCollectionProvider';
import MessageList from './MessageList';
import User from '../interfaces/User';
import Message from '../interfaces/Message';
import ScrollDownChip from './ScrollDownChip';

let cachedScrollTop = 0;
let cachedIsSoundOn = false;

interface MessageListContainerProps {
  user: User;
  isSoundOn: boolean;
  playSound: () => void;
}

const MessageListContainer: FunctionComponent<MessageListContainerProps> = ({
  user,
  isSoundOn,
  playSound,
}: MessageListContainerProps) => {
  const chatBottomRef = useRef() as MutableRefObject<HTMLDivElement>;
  const chatTopRef = useRef() as MutableRefObject<HTMLDivElement>;
  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [haveNewMessages, setHaveNewMessages] = useState(false);
  const [isScrollButtonShown, setIsScrollButtonShown] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const theme = useTheme();
  cachedIsSoundOn = isSoundOn;

  const style: Record<string, CSSProperties> = {
    boxStyle: {
      backgroundColor: theme.palette.background.default,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
  };

  const isAtTheBottom = () => {
    return (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
      chatRef?.current?.clientHeight + chatRef?.current?.clientHeight * 0.5
    );
  };

  const scrollUpSmoothly = () => {
    chatTopRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollDownSmoothly = () => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const scrollDown = () => {
    chatBottomRef?.current?.scrollIntoView({
      block: 'end',
    });
  };

  const onNewMessage = () => {
    if (cachedIsSoundOn) {
      playSound();
    }

    if (isAtTheBottom()) {
      scrollDownSmoothly();
    } else {
      setHaveNewMessages(true);
      setIsScrollButtonShown(true);
    }
  };

  const chipClickHandler = () => {
    setIsScrollButtonShown(false);
    setIsScrollingDown(true);
    scrollDownSmoothly();
  };

  const onScroll = () => {
    setTimeout(() => {
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
    }, 0);
  };

  return (
    <>
      <PinnedMessage onClick={scrollUpSmoothly} />
      <Box
        {...{ ref: chatRef }}
        onScroll={onScroll}
        flexGrow='1'
        position='relative'
        style={style.boxStyle}
      >
        <div ref={chatTopRef} style={{ width: '100%', height: '0px' }} />
        <MessageCollectionProviderMemorized
          renderChildren={(messages: Message[], isLoading: boolean) => (
            <>
              {!isLoading && (
                <CachedMessageCollectionProvider
                  currentUser={user}
                  messages={messages || []}
                  afterCachedMessagesAreRenderedCallback={onNewMessage}
                  scrollDown={scrollDown}
                  scrollDownSmoothly={scrollDownSmoothly}
                  renderChildren={(
                    cachedGroupedMessages: Message[][],
                    isListShown: boolean,
                  ) => (
                    <Box
                      pt='40px'
                      style={{
                        opacity: isListShown ? '1' : '0',
                        transition: 'opacity 1s',
                        maxWidth: theme.breakpoints.values.md,
                        margin: '0 auto',
                      }}
                    >
                      <MessageList
                        user={user}
                        groupedMessages={cachedGroupedMessages}
                      />
                    </Box>
                  )}
                />
              )}
              {isLoading && (
                <Box
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CircularProgress color='primary' />
                </Box>
              )}
            </>
          )}
        />
        <div ref={chatBottomRef} style={{ width: '100%', height: '2px' }} />
      </Box>
      <ScrollDownChip
        show={isScrollButtonShown}
        onClick={chipClickHandler}
        label='You have new messages'
        showLabel={haveNewMessages}
      />
    </>
  );
};

export default MessageListContainer;
