import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { MessageListItemProps } from '../interfaces/MessageListItemProps';

const MessageListItem = ({ message, user }: MessageListItemProps) => (
  <div
    className={`app-message-list-item-container${
      user.uid === message.userUid
        ? ' app-message-list-item-container--personal'
        : ''
    }
    `}
  >
    <Card className='app-message-list-item'>
      <CardContent className='app-message-list-item__content'>
        <Typography variant='body2' component='p'>
          {message.value}
        </Typography>
        <Typography color='textSecondary' variant='caption'>
          {message.timestamp &&
            new Date(message.timestamp.seconds * 1000).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default MessageListItem;
