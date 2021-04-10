import React, { useEffect, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import CachedMessageCollectionProviderProps from '../interfaces/CachedMessageCollectionProviderProps';

const cachedMessages: Data[] = [];
let areOldMessagesLoaded = false;

const CachedMessageCollectionProvider: FunctionComponent<CachedMessageCollectionProviderProps> = ({
  oldMessages,
  freshMessages,
  renderChildren,
  afterCachedMessagesAreRenderedCallback,
  onFirstRenderingCallback,
}: CachedMessageCollectionProviderProps) => {
  if (cachedMessages.length === 0) {
    cachedMessages.push(...oldMessages);
  }

  const newMessages = freshMessages.filter(
    (message) =>
      message.timestamp &&
      !cachedMessages.find((cachedMessage) => cachedMessage.id === message.id),
  );
  cachedMessages.push(...newMessages);

  useEffect(() => {
    if (
      !areOldMessagesLoaded &&
      freshMessages[freshMessages.length - 1].timestamp
    ) {
      areOldMessagesLoaded = true;
      onFirstRenderingCallback();
    } else if (freshMessages[freshMessages.length - 1].timestamp) {
      afterCachedMessagesAreRenderedCallback();
    }
  });

  return <>{renderChildren(cachedMessages)}</>;
};

export default CachedMessageCollectionProvider;
