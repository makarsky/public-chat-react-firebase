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
const newMessageSound = new Audio('/new_message.mp3');

interface MessageListContainerProps {
  user: User;
  isSoundOn: boolean;
}

const MessageListContainer: FunctionComponent<MessageListContainerProps> = ({
  user,
  isSoundOn,
}: MessageListContainerProps) => {
  const chatBottomRef = useRef() as MutableRefObject<HTMLSpanElement>;
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
    if (cachedIsSoundOn) {
      newMessageSound.play();
    }

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
      <Box
        {...{ ref: chatRef }}
        onScroll={onScroll}
        flexGrow='1'
        position='relative'
        style={style.boxStyle}
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
