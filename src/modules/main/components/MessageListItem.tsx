import React, { FunctionComponent } from 'react';
import * as timeago from 'timeago.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import enShort from 'timeago.js/lib/lang/en_short';
import User from '../interfaces/User';
import Message from '../interfaces/Message';

timeago.register('enShort', enShort);

const cardRadius = '10px';

const defaultCardStye = {
  borderTopLeftRadius: cardRadius,
  borderTopRightRadius: cardRadius,
  borderBottomLeftRadius: cardRadius,
  borderBottomRightRadius: cardRadius,
  backgroundColor: '#ffffff',
};
const sharpLeftCorder = {
  borderBottomLeftRadius: '0',
};
const sharpRightCorder = {
  borderBottomRightRadius: '0',
};

interface MessageListItemProps {
  message: Message;
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
  const nameColor = belongsToUser ? '#5c6bc0' : message.userData.color;

  let cardStyle = defaultCardStye;

  if (belongsToUser) {
    cardStyle = { ...cardStyle, backgroundColor: '#fffde7' };
  }

  if (showTail) {
    const borderStyle = belongsToUser ? sharpRightCorder : sharpLeftCorder;
    cardStyle = { ...cardStyle, ...borderStyle };
  }

  return (
    <Box flexGrow='1' my={0.2}>
      <Box display='inline-block' maxWidth='80%' minWidth='90px'>
        <Card style={cardStyle}>
          <CardContent style={{ padding: '6px' }}>
            {showName && (
              <Box
                fontWeight={900}
                textAlign='left'
                fontSize={13}
                mb={0.5}
                color={nameColor}
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
              {timeago.format(message.timestamp.seconds * 1000, 'enShort')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MessageListItem;
