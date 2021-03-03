import React from 'react';
import { FirestoreBatchedWrite } from '@react-firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { MessageFormProps } from '../interfaces/MessageFormProps';

const collectionPath = 'messages';
const userPath = 'users';

const handleSubmit = (event: any) => {
  event.preventDefault();
};

const newMessage = {
  value: '',
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  userUid: '',
};

const MessageForm = ({ userUid, setTimerSeconds }: MessageFormProps) => (
  <FirestoreBatchedWrite>
    {({ addMutationToBatch, commit }) => (
      <form className='app-message-form' onSubmit={handleSubmit}>
        <div className='app-message-form__row'>
          <label htmlFor='amount'>
            <div>Amount</div>
            <input
              id='amount'
              type='text'
              onChange={(event) => {
                newMessage.value = event.target.value;
              }}
            />
          </label>
        </div>
        <div className='app-message-form__row'>
          <button
            type='submit'
            data-testid='add-document'
            onClick={async () => {
              newMessage.timestamp = firebase.firestore.FieldValue.serverTimestamp();
              newMessage.userUid = userUid;

              if (!newMessage.value) {
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
              }
            }}
          >
            Add Record
          </button>
        </div>
      </form>
    )}
  </FirestoreBatchedWrite>
);

export default MessageForm;
