import React, { useEffect, useState, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import CachedMessageCollectionProviderProps from '../interfaces/CachedMessageCollectionProviderProps';

const cachedMessages: Data[] = [];

const CachedMessageCollectionProvider: FunctionComponent<CachedMessageCollectionProviderProps> = ({
  messages,
  renderChildren,
}: CachedMessageCollectionProviderProps) => {
  const [, setHash] = useState(0);

  useEffect(() => {
    const newMessages = messages.filter(
      (message) =>
        message.timestamp &&
        !cachedMessages.find(
          (cachedMessage) => cachedMessage.id === message.id,
        ),
    );
    cachedMessages.push(...newMessages);
    setHash((v) => v + 1);
  }, [messages]);

  return <>{renderChildren(cachedMessages)}</>;
};

export default CachedMessageCollectionProvider;
