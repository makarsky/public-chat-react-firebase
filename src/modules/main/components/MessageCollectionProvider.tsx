import React, { FunctionComponent } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import firebaseProvider from '../../../firebase';

interface RenderMessageCollectionProviderChildren {
  (messages: Data[], isLoading: boolean): JSX.Element;
}

interface MessageCollectionProviderProps {
  renderChildren: RenderMessageCollectionProviderChildren;
}

const MessageCollectionProvider: FunctionComponent<MessageCollectionProviderProps> = ({
  renderChildren,
}: MessageCollectionProviderProps) => {
  const messagesRef = firebaseProvider.firestore.collection('messages');
  const query = messagesRef.orderBy('timestamp', 'desc').limit(15);

  const [messages, isLoading] = useCollectionData(query, { idField: 'id' });
  console.log(messages);

  return <>{renderChildren(messages?.reverse() || [], isLoading)}</>;
};

export const MessageCollectionProviderMemorized = React.memo(
  MessageCollectionProvider,
  () => true,
);
