import User from './User';
import Message from './Message';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

export interface MessageListItemProps {
  message: Data;
  user: User;
}
