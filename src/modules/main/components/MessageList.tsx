import React, { useEffect, useState, FunctionComponent } from 'react';
import MessageListItemGroup from './MessageListItemGroup';
import User from '../interfaces/User';
import Message from '../interfaces/Message';

const timeoutInSeconds = 15;

interface MessageListProps {
  user: User;
  groupedMessages: Message[][];
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

  const getKey = (messages: Message[]) => {
    return messages.reduce(
      (acc: string, message: Message) => acc + message.id,
      'MessageListItemGroup',
    );
  };

  return (
    <>
      {groupedMessages &&
        groupedMessages.map((messages: Message[]) => (
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
