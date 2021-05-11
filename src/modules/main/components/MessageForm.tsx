import React, { useState, useEffect, FunctionComponent } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useTheme } from '@material-ui/core/styles';
import firebaseProvider from '../../../firebase';
import Message from '../interfaces/Message';
import SendMessageButton from './SendMessageButton';
import StyledTextField from './StyledTextField';
import UserData from '../interfaces/UserData';

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  userData: UserData,
  setLastMessageDate: React.Dispatch<React.SetStateAction<Date>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  message: string,
) => {
  const newMessage: Message = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userData: { uid: userData.uid, name: userData.name, color: userData.color },
    value: message.trim(),
  };

  if (!newMessage.value) {
    event.preventDefault();
    return;
  }

  const batch = firebaseProvider.firestore.batch();

  batch.set(
    firebaseProvider.firestore.doc(`messages/${Date.now() + userData.uid}`),
    newMessage,
  );
  batch.set(firebaseProvider.firestore.doc(`users/${userData.uid}`), {
    name: userData.name,
    color: userData.color,
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

const getLastSubmissionDate = (userData: UserData) => {
  return userData.rateLimit?.lastMessage
    ? userData.rateLimit.lastMessage.toDate()
    : getDefaultLastSubmissionDate();
};

interface MessageFormProps {
  userData: UserData;
  isLoading: boolean;
}

const MessageForm: FunctionComponent<MessageFormProps> = ({
  userData,
  isLoading,
}: MessageFormProps) => {
  const [lastMessageDate, setLastMessageDate] = useState(
    getLastSubmissionDate(userData),
  );
  const [message, setMessage] = useState('');
  const theme = useTheme();

  useEffect(() => setLastMessageDate(getLastSubmissionDate(userData)), [
    userData,
  ]);

  return (
    <form
      className='app-message-form'
      onSubmit={(event) =>
        handleSubmit(event, userData, setLastMessageDate, setMessage, message)
      }
      noValidate
      autoComplete='off'
      style={{ zIndex: 0, backgroundColor: theme.palette.background.default }}
    >
      <StyledTextField
        label='Message...'
        variant='filled'
        onChange={(event) => setMessage(event.target.value)}
        fullWidth
        value={message}
        multiline
        rowsMax={10}
      />
      <SendMessageButton
        isDisabled={isLoading}
        lastMessageDate={lastMessageDate}
      />
    </form>
  );
};

export default MessageForm;
