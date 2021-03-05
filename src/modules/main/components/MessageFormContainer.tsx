import React, { useEffect, useState } from 'react';
import { MessageFormContainerProps } from '../interfaces/MessageFormContainerProps';
import MessageForm from './MessageForm';

const timeoutInSeconds = 10;

const isCoolDownActive = (lastAccessDate: Date) => {
  const allowedDate = new Date();
  allowedDate.setSeconds(allowedDate.getSeconds() - timeoutInSeconds);
  return lastAccessDate > allowedDate;
};

const getCoolDownSeconds = (lastAccessDate: Date) => {
  const allowedDate = new Date();
  allowedDate.setSeconds(allowedDate.getSeconds() - timeoutInSeconds);
  return Math.ceil((lastAccessDate.getTime() - allowedDate.getTime()) / 1000);
};

const MessageFormContainer = ({
  userUid,
  userData,
}: MessageFormContainerProps): any => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (
      userData &&
      userData.rateLimit.lastMessage &&
      isCoolDownActive(userData.rateLimit.lastMessage.toDate())
    ) {
      setSeconds(getCoolDownSeconds(userData.rateLimit.lastMessage.toDate()));
    }
  }, [userData]);

  useEffect(() => {
    let interval: any = null;
    if (seconds !== 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <MessageForm
      key={seconds}
      userUid={userUid}
      seconds={seconds}
      setTimerSeconds={setSeconds}
    />
  );
};

export default MessageFormContainer;
