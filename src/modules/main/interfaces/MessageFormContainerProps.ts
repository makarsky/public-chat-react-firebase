import RateLimit from './RateLimit';
import User from './User';
export default interface MessageFormContainerProps {
  user: User;
  rateLimit: RateLimit;
  isLoading: boolean;
}
