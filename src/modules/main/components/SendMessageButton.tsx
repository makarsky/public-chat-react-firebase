import React, { FunctionComponent, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

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

interface SendMessageButtonProps {
  isDisabled: boolean;
  lastMessageDate: Date;
}

const SendMessageButton: FunctionComponent<SendMessageButtonProps> = ({
  isDisabled,
  lastMessageDate,
}: SendMessageButtonProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isCoolDownActive(lastMessageDate)) {
      setSeconds(getCoolDownSeconds(lastMessageDate));
    }
  }, [lastMessageDate]);

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
    <Button
      variant='contained'
      color='primary'
      type='submit'
      data-testid='send-message'
      disabled={isDisabled || seconds !== 0}
    >
      {seconds > 0 ? seconds : <SendIcon />}
    </Button>
  );
};

export default SendMessageButton;
