import React, { useEffect, useState, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import MessageListItem from './MessageListItem';
import MessageListProps from '../interfaces/MessageListProps';

const MessageList: FunctionComponent<MessageListProps> = ({
  user,
  messages,
  afterMessageListIsRenderedCallback,
}: MessageListProps) => {
  useEffect(() => {
    afterMessageListIsRenderedCallback();
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
