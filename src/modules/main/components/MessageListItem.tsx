import React, { FunctionComponent } from 'react';
import * as timeago from 'timeago.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import enShort from 'timeago.js/lib/lang/en_short';
import User from '../interfaces/User';
import Message from '../interfaces/Message';

timeago.register('enShort', enShort);

const cardRadius = '10px';

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
  const theme = useTheme();
  const belongsToUser = user.uid === message.userData.uid;
  const nameColor = belongsToUser
    ? theme.palette.secondary.main
    : message.userData.color;

  let cardStyle = {
    borderTopLeftRadius: cardRadius,
    borderTopRightRadius: cardRadius,
    borderBottomLeftRadius: cardRadius,
    borderBottomRightRadius: cardRadius,
    backgroundColor: theme.palette.background.paper,
  };

  if (belongsToUser) {
    cardStyle = { ...cardStyle, backgroundColor: theme.palette.info.dark };
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
            <Box whiteSpace='break-spaces' mb={0.5}>
              <Typography color='textPrimary' variant='body1' align='left'>
                {message.value}
              </Typography>
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
