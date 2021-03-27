import React, { useEffect, useState, FunctionComponent } from 'react';
import MessageFormContainerProps from '../interfaces/MessageFormContainerProps';
import MessageForm from './MessageForm';

const timeoutInSeconds = 10;

let interval: NodeJS.Timeout;

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

const MessageFormContainer: FunctionComponent<MessageFormContainerProps> = ({
  user,
  rateLimit,
  isLoading,
}: MessageFormContainerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (
      rateLimit &&
      rateLimit.lastMessage &&
      isCoolDownActive(rateLimit.lastMessage.toDate())
    ) {
      setSeconds(getCoolDownSeconds(rateLimit.lastMessage.toDate()));
    }
  }, [rateLimit]);

  useEffect(() => {
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
      userUid={user.uid}
      seconds={seconds}
      setTimerSeconds={setSeconds}
      isLoading={isLoading}
    />
  );
};

export default MessageFormContainer;
