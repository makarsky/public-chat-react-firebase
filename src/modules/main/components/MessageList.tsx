import React from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { Message } from '../interfaces/Message';
import MessageListItem from './MessageListItem';
import { MessageListProps } from '../interfaces/MessageListProps';

const collectionPath = 'messages';

const MessageList = ({ user }: MessageListProps) => (
  <FirestoreCollection
    path={collectionPath}
    orderBy={[{ field: 'timestamp', type: 'asc' }]}
  >
    {(collection) => {
      return (
        <div className='app-message-list-container'>
          <div>
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

export default MessageList;
