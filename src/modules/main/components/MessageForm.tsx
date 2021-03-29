import React, { useState, FunctionComponent } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import TextField from '@material-ui/core/TextField';
import firebaseProvider from '../../../firebase';
import MessageFormProps from '../interfaces/MessageFormProps';
import Message from '../interfaces/Message';
import SendMessageButton from './SendMessageButton';

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  userUid: string,
  setLastMessageDate: React.Dispatch<React.SetStateAction<Date>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  message: string,
) => {
  const newMessage: Message = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userUid,
    value: message,
  };

  if (!newMessage.value) {
    event.preventDefault();
    return;
  }

  const batch = firebaseProvider.firestore.batch();

  batch.set(
    firebaseProvider.firestore.doc(`messages/${Date.now() + userUid}`),
    newMessage,
  );
  batch.set(firebaseProvider.firestore.doc(`users/${userUid}`), {
    rateLimit: { lastMessage: newMessage.timestamp },
  });

  try {
    batch.commit();
    setLastMessageDate(new Date());
    setMessage('');
  } catch (error) {
    window.location.reload();
  } finally {
    event.preventDefault();
  }
};

const getDefaultLastSubmissionDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d;
};

const MessageForm: FunctionComponent<MessageFormProps> = ({
  userUid,
  isLoading,
  rateLimit,
}: MessageFormProps) => {
  const [lastMessageDate, setLastMessageDate] = useState(
    rateLimit?.lastMessage
      ? rateLimit.lastMessage.toDate()
      : getDefaultLastSubmissionDate(),
  );
  const [message, setMessage] = useState('');

  return (
    <form
      className='app-message-form'
      onSubmit={(event) =>
        handleSubmit(event, userUid, setLastMessageDate, setMessage, message)
      }
      noValidate
      autoComplete='off'
    >
      <TextField
        label='Emoji...'
        variant='outlined'
        onChange={(event) => setMessage(event.target.value)}
        className='app-message-form__input'
        value={message}
      />
      <SendMessageButton
        isDisabled={isLoading}
        lastMessageDate={lastMessageDate}
      />
    </form>
  );
};

export default MessageForm;
