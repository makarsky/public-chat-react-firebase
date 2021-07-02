import React, { FunctionComponent } from 'react';
import { Box, IconButton, useTheme } from '@material-ui/core';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

interface NewLineButtonProps {
  onClick: () => void;
}

const NewLineButton: FunctionComponent<NewLineButtonProps> = ({
  onClick,
}: NewLineButtonProps) => {
  const theme = useTheme();

  return (
    <Box display='flex'>
      <IconButton
        size='medium'
        color='primary'
        type='button'
        aria-label='Delete'
        data-testid='delete-button'
        onClick={onClick}
      >
        <Box display='flex' flexDirection='column'>
          <SubdirectoryArrowLeftIcon
            style={{ color: theme.palette.grey[500] }}
          />
        </Box>
      </IconButton>
    </Box>
  );
};

export default NewLineButton;
