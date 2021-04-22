import React, { useEffect, useState, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import MessageListItemGroup from './MessageListItemGroup';
import User from '../interfaces/User';

const timeoutInSeconds = 15;

interface MessageListProps {
  user: User;
  groupedMessages: Data[][];
}

const MessageList: FunctionComponent<MessageListProps> = ({
  user,
  groupedMessages,
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

  const getKey = (messages: Data[]) => {
    return messages.reduce(
      (acc: string, message: Data) => acc + message.id,
      'MessageListItemGroup',
    );
  };

  return (
    <>
      {groupedMessages &&
        groupedMessages.map((messages: Data[]) => (
          <MessageListItemGroup
            key={getKey(messages)}
            messages={messages}
            user={user}
          />
        ))}
    </>
  );
};

export default MessageList;
