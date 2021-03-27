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

  const chatRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <div className='app-message-list-container'>
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
        <span ref={chatRef} />
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
