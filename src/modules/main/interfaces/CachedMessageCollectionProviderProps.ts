import Message from './Message';
import User from './User';

interface RenderCachedMessageCollectionProviderChildren {
  (cachedGroupedMessages: Message[][], isListShown: boolean): JSX.Element;
}

export default interface CachedMessageCollectionProviderProps {
  currentUser: User,
  messages: Message[];
  renderChildren: RenderCachedMessageCollectionProviderChildren;
  afterCachedMessagesAreRenderedCallback: () => void;
  scrollDown: () => void;
  scrollDownSmoothly: () => void;
}