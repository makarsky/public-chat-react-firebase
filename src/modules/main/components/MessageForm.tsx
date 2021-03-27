import React, { FunctionComponent } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import firebaseProvider from '../../../firebase';
import MessageFormProps from '../interfaces/MessageFormProps';
import Message from '../interfaces/Message';

let newMessageValue = '';

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  userUid: string,
  setTimerSeconds: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newMessage: Message = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userUid,
    value: newMessageValue,
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
    setTimerSeconds(10);
  } catch (error) {
    window.location.reload();
  } finally {
    newMessageValue = '';
    event.preventDefault();
  }
};

const MessageForm: FunctionComponent<MessageFormProps> = ({
  userUid,
  seconds,
  setTimerSeconds,
  isLoading,
}: MessageFormProps) => (
  <form
    className='app-message-form'
    onSubmit={(event) => handleSubmit(event, userUid, setTimerSeconds)}
    noValidate
    autoComplete='off'
  >
    <TextField
      label='Emoji...'
      variant='outlined'
      onChange={(event) => {
        newMessageValue = event.target.value;
      }}
      className='app-message-form__input'
    />
    <Button
      variant='contained'
      color='primary'
      type='submit'
      data-testid='send-message'
      disabled={isLoading || seconds !== 0}
    >
      {seconds > 0 ? seconds : <SendIcon />}
    </Button>
  </form>
);

export default MessageForm;
