import React, { useEffect, FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import CachedMessageCollectionProviderProps from '../interfaces/CachedMessageCollectionProviderProps';

const cachedMessages: Data[] = [];
const cachedGroupedMessages: Array<Array<Data>> = [];

const CachedMessageCollectionProvider: FunctionComponent<CachedMessageCollectionProviderProps> = ({
  messages,
  renderChildren,
  afterCachedMessagesAreRenderedCallback,
  scrollDown,
}: CachedMessageCollectionProviderProps) => {
  const newMessages = messages.filter(
    (message) =>
      message.timestamp &&
      !cachedMessages.find((cachedMessage) => cachedMessage.id === message.id),
  );

  cachedMessages.push(...newMessages);

  newMessages.forEach((message: Data) => {
    if (cachedGroupedMessages.length === 0) {
      cachedGroupedMessages.push([message]);
      return;
    }

    const lastGroup = cachedGroupedMessages[cachedGroupedMessages.length - 1];
    const lastGroupMessage = lastGroup[lastGroup.length - 1];

    if (lastGroupMessage.userData.uid === message.userData.uid) {
      cachedGroupedMessages[cachedGroupedMessages.length - 1].push(message);
    } else {
      cachedGroupedMessages.push([message]);
    }
  });

  useEffect(() => {
    if (
      messages[messages.length - 1]?.timestamp &&
      messages[messages.length - 1]?.userData.uid === currentUser.uid
    ) {
      // On each current user new message
      scrollDown();
    } else if (
      cachedMessages.length === messages.length &&
      messages[messages.length - 1]?.timestamp
    ) {
      // On the first rendering
      scrollDown();
    } else if (messages[messages.length - 1]?.timestamp) {
      // On each new message
      afterCachedMessagesAreRenderedCallback();
    }
  });

  return <>{renderChildren(cachedGroupedMessages)}</>;
};

export default CachedMessageCollectionProvider;
