import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Attachment from '@material-ui/icons/Attachment';
import { Typography, useTheme } from '@material-ui/core';

const PinnedMessage: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box
      className='pinned-message'
      bgcolor={theme.palette.primary.light}
      color={theme.palette.grey.A100}
      p={1}
      position='sticky'
      top={0}
      display='flex'
      alignItems='center'
      zIndex={1}
    >
      <Box color='white' clone px={1}>
        <Attachment />
      </Box>
      <Typography variant='body2' component='span' noWrap>
        Pinned message
      </Typography>
    </Box>
  );
};

export default PinnedMessage;
