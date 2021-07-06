import React, { useState, useEffect, FunctionComponent } from 'react';
import CachedMessageCollectionProviderProps from '../interfaces/CachedMessageCollectionProviderProps';
import Message from '../interfaces/Message';
import hardCodedMessages from '../configs/hardCodedMessages';

const cachedMessages: Message[] = [];
const cachedGroupedMessages: Array<Array<Message>> = hardCodedMessages;
const hardCodedMessagesCount = hardCodedMessages.length;

const CachedMessageCollectionProvider: FunctionComponent<CachedMessageCollectionProviderProps> =
  ({
    currentUser,
    messages,
    renderChildren,
    afterCachedMessagesAreRenderedCallback,
    scrollDown,
    scrollDownSmoothly,
  }: CachedMessageCollectionProviderProps) => {
    const [isListShown, setIsListShown] = useState(false);

    const newMessages = messages
      .filter(
        (message) =>
          !cachedMessages.find(
            (cachedMessage) => cachedMessage.id === message.id,
          ),
      )
      .map((message): Message => {
        if (message.timestamp) {
          return message;
        }
        // Have to do this hack, because sometimes timestamp is undefined.
        return {
          ...message,
          timestamp: { seconds: Date.now() / 1000 },
        };
      });

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
      if (
        cachedMessages.length - hardCodedMessagesCount !== messages.length &&
        messages[messages.length - 1]?.userData.uid === currentUser.uid
      ) {
        // On each current user's new message
        scrollDownSmoothly();
      } else if (
        cachedMessages.length - hardCodedMessagesCount !==
        messages.length
      ) {
        // On each new message
        afterCachedMessagesAreRenderedCallback();
      }
    });

    useEffect(() => {
      // On the first rendering
      scrollDown();
      setIsListShown(true);
    }, [isListShown, scrollDown]);

    return <>{renderChildren(cachedGroupedMessages, isListShown)}</>;
  };

export default CachedMessageCollectionProvider;
