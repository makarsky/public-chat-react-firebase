import React, { FunctionComponent } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import firebaseProvider from '../../../firebase';

interface RenderOldMessageCollectionProviderChildren {
  (messages: Data[], isLoading: boolean): JSX.Element;
}

interface OldMessageCollectionProviderProps {
  renderChildren: RenderOldMessageCollectionProviderChildren;
}

const OldMessageCollectionProvider: FunctionComponent<OldMessageCollectionProviderProps> = ({
  renderChildren,
}: OldMessageCollectionProviderProps) => {
  const messagesRef = firebaseProvider.firestore.collection('messages');
  const query = messagesRef.orderBy('timestamp', 'desc').limit(15);

  const [messages, isLoading] = useCollectionDataOnce(query, { idField: 'id' });
  console.log('recent messages', messages);

  return <>{renderChildren(messages?.reverse() || [], isLoading)}</>;
};

export default OldMessageCollectionProvider;
