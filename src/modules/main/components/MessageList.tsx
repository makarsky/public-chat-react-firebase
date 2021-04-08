import React, { useEffect, useState, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import MessageListItem from './MessageListItem';
import MessageListProps from '../interfaces/MessageListProps';

const timeoutInSeconds = 15;

let interval: NodeJS.Timeout;

const MessageList: FunctionComponent<MessageListProps> = ({
  user,
  messages,
}: MessageListProps) => {
  const [, setHash] = useState(0);

  useEffect(() => {
    interval = setInterval(() => {
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
