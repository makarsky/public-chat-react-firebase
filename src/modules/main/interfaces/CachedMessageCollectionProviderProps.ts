import Message from './Message';
import User from './User';

interface RenderCachedMessageCollectionProviderChildren {
  (cachedGroupedMessages: Message[][]): JSX.Element;
}

export default interface CachedMessageCollectionProviderProps {
  currentUser: User,
  messages: Message[];
  renderChildren: RenderCachedMessageCollectionProviderChildren;
  afterCachedMessagesAreRenderedCallback: () => void;
  scrollDown: () => void;
}