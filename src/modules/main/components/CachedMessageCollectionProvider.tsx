import React, { useEffect, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import CachedMessageCollectionProviderProps from '../interfaces/CachedMessageCollectionProviderProps';

const cachedMessages: Data[] = [];

const CachedMessageCollectionProvider: FunctionComponent<CachedMessageCollectionProviderProps> = ({
  messages,
  renderChildren,
  afterCachedMessagesAreRenderedCallback,
  onFirstRenderingCallback,
}: CachedMessageCollectionProviderProps) => {
  const newMessages = messages.filter(
    (message) =>
      message.timestamp &&
      !cachedMessages.find((cachedMessage) => cachedMessage.id === message.id),
  );
  cachedMessages.push(...newMessages);

  useEffect(() => {
    if (
      cachedMessages.length === messages.length &&
      messages[messages.length - 1]?.timestamp
    ) {
      onFirstRenderingCallback();
    } else if (messages[messages.length - 1]?.timestamp) {
      afterCachedMessagesAreRenderedCallback();
    }
  });

  return <>{renderChildren(cachedMessages)}</>;
};

export default CachedMessageCollectionProvider;
