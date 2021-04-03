import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Attachment from '@material-ui/icons/Attachment';
import { Typography } from '@material-ui/core';

const PinnedMessage: FunctionComponent = () => (
  <Box
    className='pinned-message'
    bgcolor='#2c387e'
    p={1}
    position='sticky'
    top={0}
    display='flex'
    alignItems='center'
  >
    <Box color='white' clone px={1}>
      <Attachment />
    </Box>
    <Typography variant='body2' component='span' noWrap>
      Pinned message
    </Typography>
  </Box>
);

export default PinnedMessage;
