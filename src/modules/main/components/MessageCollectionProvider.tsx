import React, { FunctionComponent } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebaseProvider from '../../../firebase';
import Message from '../interfaces/Message';

interface RenderMessageCollectionProviderChildren {
  (messages: Message[], isLoading: boolean): JSX.Element;
}

interface MessageCollectionProviderProps {
  renderChildren: RenderMessageCollectionProviderChildren;
}

const MessageCollectionProvider: FunctionComponent<MessageCollectionProviderProps> =
  ({ renderChildren }: MessageCollectionProviderProps) => {
    const messagesRef = firebaseProvider.firestore.collection('messages');
    const query = messagesRef.orderBy('timestamp', 'desc').limit(15);

    const [messages, isLoading] = useCollectionData<Message>(query, {
      idField: 'id',
    });

    return <>{renderChildren(messages?.reverse() || [], isLoading)}</>;
  };

export const MessageCollectionProviderMemorized = React.memo(
  MessageCollectionProvider,
  () => true,
);
