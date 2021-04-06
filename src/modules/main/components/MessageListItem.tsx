import React, { FunctionComponent } from 'react';
import { format } from 'timeago.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { MessageListItemProps } from '../interfaces/MessageListItemProps';

const MessageListItem: FunctionComponent<MessageListItemProps> = ({
  message,
  user,
}: MessageListItemProps) => (
  <Box
    my={0.5}
    mx={1}
    textAlign={user.uid === message.userUid ? 'right' : 'left'}
  >
    <Card className='app-message-list-item'>
      <CardContent className='app-message-list-item__content'>
        <Typography variant='body2' component='p'>
          {message.value}
        </Typography>
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
