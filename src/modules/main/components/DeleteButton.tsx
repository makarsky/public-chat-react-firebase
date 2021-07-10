import React, { FunctionComponent } from 'react';
import { Box, IconButton, useTheme } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';

const maxMs = 500;
const minMs = 150;
const stepMs = 50;

let timeout: NodeJS.Timeout;

const onLongPress = (onClick: () => void, ms: number = maxMs) => {
  onClick();
  const nextMs = ms - stepMs < minMs ? minMs : ms - stepMs;
  timeout = setTimeout(() => onLongPress(onClick, nextMs), ms);
};

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
  onClick,
}: DeleteButtonProps) => {
  const theme = useTheme();

  return (
    <Box
      display='flex'
      width='39px'
      alignItems='center'
      justifyContent='center'
    >
      <IconButton
        size='small'
        color='primary'
        type='button'
        aria-label='Delete'
        data-testid='delete-button'
        onMouseDown={() => onLongPress(onClick)}
        onMouseUp={() => clearTimeout(timeout)}
      >
        <Box display='flex' flexDirection='column'>
          <BackspaceIcon style={{ color: theme.palette.grey[500] }} />
        </Box>
      </IconButton>
    </Box>
  );
};

export default DeleteButton;
