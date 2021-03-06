import React, { FunctionComponent, useState, useEffect } from 'react';
import SendIcon from '@material-ui/icons/Send';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Tooltip,
  useTheme,
} from '@material-ui/core';
import { isCoolDownActive, getCoolDownSeconds } from '../utils/cooldown';

let interval: NodeJS.Timeout;

interface SendMessageButtonProps {
  isDisabled: boolean;
  lastMessageDate: Date;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SendMessageButton: FunctionComponent<SendMessageButtonProps> = ({
  isDisabled,
  lastMessageDate,
  onClick,
}: SendMessageButtonProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const theme = useTheme();

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
    <Box display='flex' alignItems='flex-end'>
      <Box display='flex' height='39px' width='39px'>
        {!isTimerShown && (
          <IconButton
            size='small'
            color='primary'
            aria-label='Send'
            data-testid='send-message'
            disabled={isDisabled}
            onClick={onClick}
          >
            <SendIcon style={{ color: theme.palette.info.light }} />
          </IconButton>
        )}
        {isTimerShown && (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              title='Anti-SPAM timer :)'
              onClose={handleTooltipClose}
              open={isTooltipOpen}
              arrow
            >
              <IconButton
                size='small'
                color='primary'
                style={{ width: '100%' }}
                onMouseDown={handleTooltipOpen}
              >
                <Box style={{ color: theme.palette.grey[500] }}>{seconds}</Box>
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        )}
      </Box>
    </Box>
  );
};

export default SendMessageButton;
