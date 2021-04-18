import React, { FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import { format } from 'timeago.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Avatar } from '@material-ui/core';
import User from '../interfaces/User';

const userMessageStyles = {
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '0px',
};
const otherMessageStyles = {
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '10px',
};

interface MessageListItemProps {
  message: Data;
  user: User;
}

const MessageListItem: FunctionComponent<MessageListItemProps> = ({
  message,
  user,
}: MessageListItemProps) => {
  const belongsToUser = user.uid === message.userData.uid;

  return (
    <Box
      my={0.5}
      mx={1}
      textAlign={belongsToUser ? 'right' : 'left'}
      display='flex'
    >
      {!belongsToUser && (
        <Box mr={1}>
          <Box height='calc(100% - 40px)' />
          <Box position='sticky' bottom='0' pb={0.4}>
            <Avatar
              alt='Remy Sharp'
              style={{ backgroundColor: message.userData.color }}
            >
              {message.userData.name[0]}
            </Avatar>
          </Box>
        </Box>
      )}
      <Box flexGrow='1'>
        <Box display='inline-block' maxWidth='80%'>
          <Card style={belongsToUser ? userMessageStyles : otherMessageStyles}>
            <CardContent style={{ padding: '6px' }}>
              <Box
                fontWeight={900}
                textAlign='left'
                fontSize={13}
                mb={0.5}
                color={message.userData.color}
              >
                {message.userData.name}
              </Box>
              <Box
                textAlign='left'
                whiteSpace='break-spaces'
                fontSize={15}
                mb={0.5}
              >
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
      </Box>
    </Box>
  );
};

export default MessageListItem;
