import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Attachment from '@material-ui/icons/Attachment';
import { Typography, useTheme } from '@material-ui/core';

const PinnedMessage: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box position='relative' height='0'>
      <Box
        display='flex'
        justifyContent='center'
        position='absolute'
        top='0'
        width='100%'
        bgcolor={theme.palette.primary.light}
        color={theme.palette.grey.A100}
        zIndex={1}
      >
        <Box
          p={1}
          display='flex'
          alignItems='center'
          width='100%'
          maxWidth={theme.breakpoints.values.md}
        >
          <Box color='white' clone px={1}>
            <Attachment />
          </Box>
          <Typography variant='body2' component='span' noWrap>
            Pinned message
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PinnedMessage;
