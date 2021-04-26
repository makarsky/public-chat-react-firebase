import React, { useEffect, FunctionComponent } from 'react';
import CachedMessageCollectionProviderProps from '../interfaces/CachedMessageCollectionProviderProps';
import Message from '../interfaces/Message';

const cachedMessages: Message[] = [];
const cachedGroupedMessages: Array<Array<Message>> = [];

const CachedMessageCollectionProvider: FunctionComponent<CachedMessageCollectionProviderProps> = ({
  currentUser,
  messages,
  renderChildren,
  afterCachedMessagesAreRenderedCallback,
  scrollDown,
}: CachedMessageCollectionProviderProps) => {
  const newMessages = messages
    .filter(
      (message) =>
        !cachedMessages.find(
          (cachedMessage) => cachedMessage.id === message.id,
        ),
    )
    .map(
      (message): Message => {
        if (message.timestamp) {
          return message;
        }
        // Have to do this hack, because sometimes timestamp is undefined.
        return {
          ...message,
          timestamp: { seconds: Date.now() / 1000 },
        };
      },
    );

  cachedMessages.push(...newMessages);

  newMessages.forEach((message: Message) => {
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
    if (messages[messages.length - 1]?.userData.uid === currentUser.uid) {
      // On each current user's new message
      scrollDown();
    } else if (cachedMessages.length === messages.length) {
      // On the first rendering
      scrollDown();
    } else {
      // On each new message
      afterCachedMessagesAreRenderedCallback();
    }
  });

  return <>{renderChildren(cachedGroupedMessages)}</>;
};

export default CachedMessageCollectionProvider;
