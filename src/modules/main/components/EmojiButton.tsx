import React, { FunctionComponent } from 'react';
import { Box, IconButton, useTheme } from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';

const EmojiButton: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box display='flex' alignItems='flex-end'>
      <Box display='flex' height='56px'>
        <IconButton
          size='medium'
          color='primary'
          type='button'
          aria-label='Show emojis'
          data-testid='show-emojis'
        >
          <MoodIcon style={{ color: theme.palette.grey[500] }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EmojiButton;
