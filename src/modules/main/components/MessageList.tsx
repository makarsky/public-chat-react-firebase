import React, { useEffect, useState, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import MessageListItem from './MessageListItem';
import User from '../interfaces/User';

const timeoutInSeconds = 15;

interface MessageListProps {
  user: User;
  messages: Data[];
}

const MessageList: FunctionComponent<MessageListProps> = ({
  user,
  messages,
}: MessageListProps) => {
  const [, setHash] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHash((v) => v + 1);
    }, timeoutInSeconds * 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {messages &&
        messages.map((item: Data, index: number) => (
          <MessageListItem
            message={item}
            user={user}
            key={messages[index].id}
          />
        ))}
    </>
  );
};

export default MessageList;
