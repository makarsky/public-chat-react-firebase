import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

interface RenderCachedMessageCollectionProviderChildren {
  (cachedGroupedMessages: Data[][]): JSX.Element;
}

export default interface CachedMessageCollectionProviderProps {
  messages: Data[];
  renderChildren: RenderCachedMessageCollectionProviderChildren;
  afterCachedMessagesAreRenderedCallback: () => void;
  scrollDown: () => void;
}