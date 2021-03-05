import React from 'react';
import { FirestoreBatchedWrite } from '@react-firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { MessageFormProps } from '../interfaces/MessageFormProps';

const collectionPath = 'messages';
const userPath = 'users';

const newMessage = {
  value: '',
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  userUid: '',
};

const handleSubmit = async (
  event: any,
  addMutationToBatch: any,
  commit: any,
  userUid: string,
  setTimerSeconds: any,
) => {
  newMessage.timestamp = firebase.firestore.FieldValue.serverTimestamp();
  newMessage.userUid = userUid;

  if (!newMessage.value) {
    event.preventDefault();
    return;
  }

  addMutationToBatch({
    path: `${collectionPath}/${Date.now() + userUid}`,
    value: newMessage,
    type: 'set',
  });
  addMutationToBatch({
    path: `${userPath}/${userUid}`,
    value: { rateLimit: { lastMessage: newMessage.timestamp } },
    type: 'set',
  });
  try {
    commit();
    setTimerSeconds(10);
  } catch (error) {
    window.location.reload();
  } finally {
    newMessage.value = '';
    event.preventDefault();
  }
};

const MessageForm = ({
  userUid,
  seconds,
  setTimerSeconds,
}: MessageFormProps) => (
  <FirestoreBatchedWrite>
    {({ addMutationToBatch, commit }) => (
      <form
        className='app-message-form'
        onSubmit={(event) =>
          handleSubmit(
            event,
            addMutationToBatch,
            commit,
            userUid,
            setTimerSeconds,
          )
        }
      >
        <TextField
          label='Emoji...'
          variant='outlined'
          onChange={(event) => {
            newMessage.value = event.target.value;
          }}
          className='app-message-form__input'
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          data-testid='send-message'
          disabled={seconds !== 0}
        >
          {seconds > 0 ? seconds : <SendIcon />}
        </Button>
      </form>
    )}
  </FirestoreBatchedWrite>
);

export default MessageForm;
