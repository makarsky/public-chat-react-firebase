import React, { FunctionComponent } from 'react';
import { Box, IconButton, useTheme } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
  onClick,
}: DeleteButtonProps) => {
  const theme = useTheme();

  return (
    <Box display='flex' width='16%' alignItems='center' justifyContent='center'>
      <IconButton
        size='small'
        color='primary'
        type='button'
        aria-label='Delete'
        data-testid='delete-button'
        onClick={onClick}
        style={{ height: '100%', width: '100%' }}
      >
        <Box display='flex' flexDirection='column'>
          <BackspaceIcon style={{ color: theme.palette.grey[500] }} />
        </Box>
      </IconButton>
    </Box>
  );
};

export default DeleteButton;
