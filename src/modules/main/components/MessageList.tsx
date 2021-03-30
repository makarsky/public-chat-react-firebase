import React, {
  useRef,
  useEffect,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebaseProvider from '../../../firebase';
import MessageListItem from './MessageListItem';
import MessageListProps from '../interfaces/MessageListProps';

const MessageList: FunctionComponent<MessageListProps> = ({
  user,
}: MessageListProps) => {
  const messagesRef = firebaseProvider.firestore.collection('messages');
  const query = messagesRef.orderBy('timestamp', 'desc').limit(15);

  const [messages, isLoading] = useCollectionData(query, { idField: 'id' });

  const chatBottomRef = useRef() as MutableRefObject<HTMLSpanElement>;
  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
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
      <div>
        {messages &&
          messages
            .reverse()
            .map((item: any, index: number) => (
              <MessageListItem
                message={item}
                user={user}
                key={messages[index].id}
              />
            ))}
        <span ref={chatBottomRef} />
      </div>
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
