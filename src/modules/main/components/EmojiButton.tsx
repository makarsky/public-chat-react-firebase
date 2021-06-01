import React, { FunctionComponent } from 'react';
import { Box, IconButton, useTheme } from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import KeyboardIcon from '@material-ui/icons/Keyboard';

interface EmojiButtonProps {
  value: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmojiButton: FunctionComponent<EmojiButtonProps> = ({
  value,
  onClick,
}: EmojiButtonProps) => {
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
          onClick={() => onClick(!value)}
          style={{ paddingRight: '6px' }}
        >
          <Box display='flex' flexDirection='column'>
            {value && (
              <KeyboardIcon style={{ color: theme.palette.grey[500] }} />
            )}
            {!value && <MoodIcon style={{ color: theme.palette.grey[500] }} />}
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default EmojiButton;
