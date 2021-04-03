import React, {
  useRef,
  useEffect,
  useState,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import MessageListItem from './MessageListItem';
import MessageListProps from '../interfaces/MessageListProps';
import PinnedMessage from './PinnedMessage';

const cachedMessages: Data[] = [];

const MessageList: FunctionComponent<MessageListProps> = ({
  user,
  messages,
  isLoading,
}: MessageListProps) => {
  const chatBottomRef = useRef() as MutableRefObject<HTMLSpanElement>;
  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [, setTimestamp] = useState(0);

  useEffect(() => {
    const newMessages = messages.filter(
      (message) =>
        !cachedMessages.find(
          (cachedMessage) => cachedMessage.id === message.id,
        ),
    );
    cachedMessages.push(...newMessages);
    setTimestamp((v) => v + 1);
    if (
      chatRef?.current?.scrollHeight - chatRef?.current?.scrollTop <
      chatRef?.current?.clientHeight + chatRef?.current?.clientHeight / 2
    ) {
      chatBottomRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    } else {
      // show tooltip "New messages" (clicking on it will scroll down)
    }
  }, [messages]);

  useEffect(() => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });

  return (
    <div className='app-message-list-container' ref={chatRef}>
      <PinnedMessage />
      <Box>
        {cachedMessages &&
          cachedMessages.map((item: Data, index: number) => (
            <MessageListItem
              message={item}
              user={user}
              key={cachedMessages[index].id}
            />
          ))}
        <span ref={chatBottomRef} />
      </Box>
      {isLoading && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <CircularProgress color='inherit' />
        </Box>
      )}
    </div>
  );
};

export default MessageList;
