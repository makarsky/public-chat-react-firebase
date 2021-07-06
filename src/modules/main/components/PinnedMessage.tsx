import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Attachment from '@material-ui/icons/Attachment';
import { Typography, useTheme, Button } from '@material-ui/core';
import hardCodedMessages from '../configs/hardCodedMessages';

interface PinnedMessageProps {
  onClick: () => void;
}

const PinnedMessage: FunctionComponent<PinnedMessageProps> = ({
  onClick,
}: PinnedMessageProps) => {
  const theme = useTheme();

  if (hardCodedMessages.length === 0) {
    return <></>;
  }

  return (
    <Box position='relative' height='0'>
      <Box
        display='flex'
        justifyContent='center'
        position='absolute'
        top='0'
        width='100%'
        bgcolor={theme.palette.primary.light}
        zIndex={1}
      >
        <Box
          display='flex'
          alignItems='center'
          width='100%'
          maxWidth={theme.breakpoints.values.md}
        >
          <Button
            size='small'
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              textTransform: 'none',
            }}
            onClick={onClick}
          >
            <Box color='white' clone px={1}>
              <Attachment />
            </Box>
            <Typography
              variant='body2'
              component='span'
              noWrap
              style={{ color: theme.palette.grey.A100 }}
            >
              Pinned message: {hardCodedMessages[0][0].value}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PinnedMessage;
