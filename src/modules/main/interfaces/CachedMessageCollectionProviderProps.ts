import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

interface RenderCachedMessageCollectionProviderChildren {
  (cachedMessages: Data[]): JSX.Element;
}

export default interface CachedMessageCollectionProviderProps {
  messages: Data[];
  renderChildren: RenderCachedMessageCollectionProviderChildren;
  afterCachedMessagesAreRenderedCallback: () => void;
  onFirstRenderingCallback: () => void;
}