import React, { useState, useEffect, FunctionComponent } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useTheme } from '@material-ui/core/styles';
import { Box, Divider, Collapse, Tabs, Tab } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import GifIcon from '@material-ui/icons/Image';
import MoodIcon from '@material-ui/icons/Mood';
import { IGif } from '@giphy/js-types';
import firebaseProvider from '../../../firebase';
import Message from '../interfaces/Message';
import SendMessageButton from './SendMessageButton';
import StyledTextField from './StyledTextField';
import UserData from '../interfaces/UserData';
import EmojiButton from './EmojiButton';
import TabPanel from './TabPanel';
import EmojiSelect from './EmojiSelect';
import { isMobileBrowser } from '../utils/browser';
import GiphySelect from './GiphySelect';
import { isCoolDownActive } from '../utils/cooldown';

const maxMessageLength = 10000;

const getModeratedMessage = (
  message: string,
  event: React.FormEvent<HTMLFormElement> | null,
) => {
  let moderatedMessage = message.trim();
  moderatedMessage = moderatedMessage.replace(/\n\n+/g, '\n');

  // Prevents from manual copy-pasting 17+ rated gifs
  if (event && /^#giphy#/.test(moderatedMessage)) {
    return ` ${moderatedMessage}`;
  }

  return moderatedMessage;
};

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement> | null,
  userData: UserData,
  lastMessageDate: Date,
  setLastMessageDate: React.Dispatch<React.SetStateAction<Date>>,
  setMessage: React.Dispatch<React.SetStateAction<string>> | null,
  message: string,
) => {
  if (isCoolDownActive(lastMessageDate)) {
    return;
  }

  const newMessage: Message = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userData: {
      uid: userData.uid,
      name: userData.name,
      colorIndex: userData.colorIndex,
    },
    value: getModeratedMessage(message, event),
  };

  if (!newMessage.value) {
    event?.preventDefault();
    return;
  }

  const batch = firebaseProvider.firestore.batch();

  batch.set(
    firebaseProvider.firestore.doc(`messages/${Date.now() + userData.uid}`),
    newMessage,
  );
  batch.set(firebaseProvider.firestore.doc(`users/${userData.uid}`), {
    name: userData.name,
    colorIndex: userData.colorIndex,
    rateLimit: { lastMessage: newMessage.timestamp },
  });

  try {
    batch.commit();
    setLastMessageDate(new Date());

    if (setMessage) {
      setMessage('');
    }
  } catch (error) {
    window.location.reload();
  } finally {
    event?.preventDefault();
  }
};

const getDefaultLastSubmissionDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d;
};

const getLastSubmissionDate = (userData: UserData) => {
  return userData.rateLimit?.lastMessage
    ? userData.rateLimit.lastMessage.toDate()
    : getDefaultLastSubmissionDate();
};

interface MessageFormProps {
  userData: UserData;
  isLoading: boolean;
}

const MessageForm: FunctionComponent<MessageFormProps> = ({
  userData,
  isLoading,
}: MessageFormProps) => {
  const [lastMessageDate, setLastMessageDate] = useState(
    getLastSubmissionDate(userData),
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [isEmojiListShown, setIsEmojiListShown] = useState(false);
  const [tab, setTab] = useState(0);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const theme = useTheme();

  useEffect(
    () => setLastMessageDate(getLastSubmissionDate(userData)),
    [userData],
  );

  const style: Record<string, CSSProperties> = {
    emojiListStyle: {
      overflowX: 'hidden',
      overflowY: 'auto',
    },
  };

  const handleInputInteraction = (
    e: React.SyntheticEvent<HTMLDivElement, Event>,
  ) => {
    if (e.target instanceof HTMLTextAreaElement) {
      setSelectionStart(e.target.selectionStart);
      setSelectionEnd(e.target.selectionEnd);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(
      `${message.substring(0, selectionStart)}${emoji}${message.substring(
        selectionEnd,
        message.length,
      )}`,
    );
    setSelectionStart(selectionStart + emoji.length);
    setSelectionEnd(selectionEnd + emoji.length);
  };

  const handleGiphyClick = (
    gif: IGif,
    e: React.SyntheticEvent<HTMLElement, Event>,
  ) => {
    e.preventDefault();
    handleSubmit(
      null,
      userData,
      lastMessageDate,
      setLastMessageDate,
      null,
      `#giphy#${gif.id}`,
    );
  };

  const handleOnFocus = () => {
    if (isMobileBrowser()) {
      setIsEmojiListShown(false);
    }
  };

  const handleOnChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    setMessage(event.target.value);
    setError(event.target.value.length >= maxMessageLength);
    setHelperText(
      event.target.value.length >= maxMessageLength
        ? 'Maximum message length is 256 characters'
        : '',
    );
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <form
        onSubmit={(event) =>
          handleSubmit(
            event,
            userData,
            lastMessageDate,
            setLastMessageDate,
            setMessage,
            message,
          )
        }
        noValidate
        autoComplete='off'
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: theme.breakpoints.values.md,
          zIndex: 0,
          backgroundColor: theme.palette.secondary.dark,
        }}
      >
        <Box display='flex' flexDirection='row'>
          <EmojiButton value={isEmojiListShown} onClick={setIsEmojiListShown} />
          <StyledTextField
            label='Message...'
            variant='filled'
            onChange={handleOnChange}
            onClick={handleInputInteraction}
            onKeyUp={handleInputInteraction}
            onFocus={handleOnFocus}
            fullWidth
            value={message}
            multiline
            rowsMax={10}
            error={error}
            helperText={helperText}
            inputProps={{
              maxLength: maxMessageLength,
            }}
          />
          <SendMessageButton
            isDisabled={isLoading}
            lastMessageDate={lastMessageDate}
          />
        </Box>
        <Collapse in={isEmojiListShown}>
          <Box height='19.9rem' display='flex' flexDirection='column'>
            <Divider />
            <Box flexGrow='1' style={style.emojiListStyle}>
              <TabPanel value={tab} index={0}>
                <EmojiSelect onClick={handleEmojiClick} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <Box>
                  <GiphySelect onClick={handleGiphyClick} />
                </Box>
              </TabPanel>
            </Box>
            <Box>
              <Divider />
              <Tabs
                value={tab}
                onChange={(_event: React.ChangeEvent<any>, n: number) =>
                  setTab(n)
                }
                variant='fullWidth'
                indicatorColor='primary'
                textColor='secondary'
                aria-label='Content type tabs'
              >
                <Tab icon={<MoodIcon />} aria-label='Emojis' />
                <Tab icon={<GifIcon />} aria-label='GIFs' />
              </Tabs>
            </Box>
          </Box>
        </Collapse>
      </form>
    </Box>
  );
};

export default MessageForm;
