import React, { FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import { format } from 'timeago.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import User from '../interfaces/User';

interface MessageListItemProps {
  message: Data;
  user: User;
}

const MessageListItem: FunctionComponent<MessageListItemProps> = ({
  message,
  user,
}: MessageListItemProps) => (
  <Box
    my={0.5}
    mx={1}
    textAlign={user.uid === message.userData.uid ? 'right' : 'left'}
  >
    <Card className='app-message-list-item'>
      <CardContent className='app-message-list-item__content'>
        <Box
          fontWeight={900}
          textAlign='left'
          fontSize={13}
          mb={0.5}
          color={message.userData.color}
        >
          {message.userData.name}
        </Box>
        <Box textAlign='left' whiteSpace='break-spaces' fontSize={15}>
          {message.value}
        </Box>
        <Typography
          color='textSecondary'
          variant='caption'
          component='p'
          align='right'
        >
          {message.timestamp
            ? format(message.timestamp.seconds * 1000)
            : format(Date.now())}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default MessageListItem;
