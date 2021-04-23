import React, { FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import { format } from 'timeago.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import User from '../interfaces/User';

const cardRadius = '10px';

const defaultCardStye = {
  borderTopLeftRadius: cardRadius,
  borderTopRightRadius: cardRadius,
  borderBottomLeftRadius: cardRadius,
  borderBottomRightRadius: cardRadius,
};
const cardStyleWithLeftTail = {
  borderTopLeftRadius: cardRadius,
  borderTopRightRadius: cardRadius,
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: cardRadius,
};
const cardStyleWithRightTail = {
  borderTopLeftRadius: cardRadius,
  borderTopRightRadius: cardRadius,
  borderBottomLeftRadius: cardRadius,
  borderBottomRightRadius: '0',
};

interface MessageListItemProps {
  message: Data;
  user: User;
  showName: boolean;
  showTail: boolean;
}

const MessageListItem: FunctionComponent<MessageListItemProps> = ({
  message,
  user,
  showName,
  showTail,
}: MessageListItemProps) => {
  const belongsToUser = user.uid === message.userData.uid;

  let cardStyle = defaultCardStye;

  if (showTail) {
    cardStyle = belongsToUser ? cardStyleWithRightTail : cardStyleWithLeftTail;
  }

  return (
    <Box flexGrow='1' my={0.2}>
      <Box display='inline-block' maxWidth='80%'>
        <Card style={cardStyle}>
          <CardContent style={{ padding: '6px' }}>
            {showName && (
              <Box
                fontWeight={900}
                textAlign='left'
                fontSize={13}
                mb={0.5}
                color={message.userData.color}
              >
                {message.userData.name}
              </Box>
            )}
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
  );
};

export default MessageListItem;
