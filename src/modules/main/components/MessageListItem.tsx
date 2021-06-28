import React, { useState, FunctionComponent, ReactNode } from 'react';
import * as timeago from 'timeago.js';
import Linkify from 'react-linkify';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, CircularProgress, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import enShort from 'timeago.js/lib/lang/en_short';
import { Gif } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';
import User from '../interfaces/User';
import Emojify from './Emojify';
import Message from '../interfaces/Message';
import userColors from '../configs/userColors';
import GiphyService from '../../../service/GiphyService';

timeago.register('enShort', enShort);

const cardRadius = '10px';
const giphySize = 190;

const sharpLeftCorder = {
  borderBottomLeftRadius: '0',
};

const sharpRightCorder = {
  borderBottomRightRadius: '0',
};

const componentDecorator = (
  decoratedHref: string,
  decoratedText: string,
  key: number,
) => {
  return (
    <Link
      key={key}
      href={decoratedHref}
      color='textPrimary'
      underline='always'
      target='_blank'
      rel='noreferrer'
    >
      {decoratedText}
    </Link>
  );
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
  const [loadedContent, setLoadedContent] = useState<ReactNode | null>(null);
  const theme = useTheme();
  let content: ReactNode | null = null;

  const matches = /^#giphy#(.+)/.exec(message.value);

  if (!loadedContent && matches) {
    GiphyService.gif(matches[1]).then((iGif: IGif) =>
      setLoadedContent(
        <Gif
          gif={iGif}
          height={giphySize}
          width={giphySize}
          noLink
          hideAttribution
        />,
      ),
    );
  } else if (!loadedContent) {
    content = (
      <Typography color='textPrimary' variant='body1' align='left'>
        <Linkify componentDecorator={componentDecorator}>
          <Emojify>{message.value}</Emojify>
        </Linkify>
      </Typography>
    );
  }

  const belongsToUser = user.uid === message.userData.uid;
  const nameColor = belongsToUser
    ? theme.palette.secondary.main
    : userColors[message.userData.colorIndex];

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
            {(content || loadedContent) && (
              <Box whiteSpace='break-spaces' mb={0.5}>
                {content || loadedContent}
              </Box>
            )}
            {!content && !loadedContent && (
              <Box
                display='flex'
                height={`${giphySize + 10}px`}
                width={`${giphySize}px`}
                justifyContent='center'
                alignItems='center'
              >
                <CircularProgress color='primary' />
              </Box>
            )}
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
