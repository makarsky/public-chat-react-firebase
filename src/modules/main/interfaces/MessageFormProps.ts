import React from 'react';

export default interface MessageFormProps {
  userUid: string;
  seconds: number;
  setTimerSeconds: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}
