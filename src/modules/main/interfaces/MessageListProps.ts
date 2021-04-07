import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import User from './User';

export default interface MessageListProps {
  user: User;
  messages: Data[];
}
