import React, { FunctionComponent } from 'react';
import { Avatar, Box } from '@material-ui/core';
import MessageListItem from './MessageListItem';
import User from '../interfaces/User';
import Message from '../interfaces/Message';
import userColors from '../configs/userColors';

interface MessageListItemGroupProps {
  user: User;
  messages: Message[];
}

const MessageListItemGroup: FunctionComponent<MessageListItemGroupProps> = ({
  user,
  messages,
}: MessageListItemGroupProps) => {
  const belongsToUser = user.uid === messages[0].userData.uid;
  const shortName = messages[0].userData.name
    .split(' ')
    .map((name: string) => name[0])
    .join('');

  return (
    <Box
      mt={0.5}
      mr={1.4}
      ml={1}
      textAlign={belongsToUser ? 'right' : 'left'}
      display='flex'
    >
      {!belongsToUser && (
        <Box display='flex' flexDirection='column' mr={1}>
          <Box flexGrow='1' />
          <Box position='sticky' bottom='0' pt={0.3} pb={0.4}>
            <Avatar
              alt='Remy Sharp'
              style={{
                backgroundColor: userColors[messages[0].userData.colorIndex],
              }}
            >
              <Box style={{ color: '#fff' }}>{shortName}</Box>
            </Avatar>
          </Box>
        </Box>
      )}
      <Box flexGrow='1'>
        {messages &&
          messages.map((item: Message, index: number) => (
            <MessageListItem
              message={item}
              user={user}
              key={messages[index].id}
              showName={index === 0}
              showTail={messages.length - 1 === index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default MessageListItemGroup;
