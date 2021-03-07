import React, { useRef } from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import Message from '../interfaces/Message';
import MessageListItem from './MessageListItem';
import MessageListProps from '../interfaces/MessageListProps';

const collectionPath = 'messages';

const MessageList = ({ user }: MessageListProps) => {
  const chatContainer = useRef<HTMLInputElement>(null);

  const scrollToMyRef = () => {
    console.log(chatContainer);
    // if (chatContainer !== null) {
    //   const scroll =
    //     chatContainer?.current.scrollHeight - chatContainer.current.clientHeight;
    //   chatContainer.current.scrollTo(0, scroll);
    // }
  };

  return (
    <FirestoreCollection
      path={collectionPath}
      orderBy={[{ field: 'timestamp', type: 'asc' }]}
    >
      {(collection) => {
        console.log(collection);
        return (
          <div className='app-message-list-container'>
            <div ref={chatContainer}>
              {collection.value &&
                collection.value.map((item: Message, index: number) => (
                  <MessageListItem
                    message={item}
                    user={user}
                    key={collection.ids[index]}
                  />
                ))}
            </div>
            {collection.isLoading && <div>Loading messages...</div>}
          </div>
        );
      }}
    </FirestoreCollection>
  );
};

export default MessageList;
