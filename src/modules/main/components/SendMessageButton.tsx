import React, { FunctionComponent, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { ClickAwayListener, Tooltip } from '@material-ui/core';

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
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

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

  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setIsTooltipOpen(true);
  };

  const isTimerShown = seconds !== 0;

  return (
    <>
      {!isTimerShown && (
        <Button
          variant='contained'
          color='primary'
          type='submit'
          data-testid='send-message'
          disabled={isDisabled}
        >
          <SendIcon />
        </Button>
      )}
      {isTimerShown && (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            title='Anti-SPAM timer :)'
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={isTooltipOpen}
            arrow
          >
            <Button
              variant='contained'
              color='default'
              onMouseDown={handleTooltipOpen}
            >
              {seconds}
            </Button>
          </Tooltip>
        </ClickAwayListener>
      )}
    </>
  );
};

export default SendMessageButton;
