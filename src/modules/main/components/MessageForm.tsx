import React, { useState, useEffect, FunctionComponent } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useTheme } from '@material-ui/core/styles';
import { Box, Divider, Collapse, Tabs, Tab } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import GifIcon from '@material-ui/icons/Image';
import MoodIcon from '@material-ui/icons/Mood';
import { IGif } from '@giphy/js-types';
import 'emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';
import firebaseProvider from '../../../firebase';
import Message from '../interfaces/Message';
import SendMessageButton from './SendMessageButton';
import DeleteButton from './DeleteButton';
import NewLineButton from './NewLineButton';
import StyledTextField from './StyledTextField';
import UserData from '../interfaces/UserData';
import EmojiButton from './EmojiButton';
import TabPanel from './TabPanel';
import { isMobileBrowser } from '../utils/browser';
import GiphySelect from './GiphySelect';
import { isCoolDownActive } from '../utils/cooldown';

const maxMessageLength = 10000;

const getModeratedMessage = (
  message: string,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
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
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  userData: UserData,
  lastMessageDate: Date,
  setLastMessageDate: React.Dispatch<React.SetStateAction<Date>>,
  setMessage: React.Dispatch<React.SetStateAction<string>> | null,
  setSelectionStart: React.Dispatch<React.SetStateAction<number>>,
  setSelectionEnd: React.Dispatch<React.SetStateAction<number>>,
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
      setSelectionStart(0);
      setSelectionEnd(0);
    }
  } catch (error) {
    window.location.reload();
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

  const insertIntoMessage = (text: string) => {
    setMessage(
      `${message.substring(0, selectionStart)}${text}${message.substring(
        selectionEnd,
        message.length,
      )}`,
    );
    setSelectionStart(selectionStart + text.length);
    setSelectionEnd(selectionEnd + text.length);
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
      setSelectionStart,
      setSelectionEnd,
      `#giphy#${gif.id}`,
    );
  };

  const handleDelete = () => {
    if (selectionStart !== selectionEnd) {
      setMessage(
        `${message.substring(0, selectionStart)}${message.substring(
          selectionEnd,
          message.length,
        )}`,
      );
      setSelectionEnd(selectionStart);
      return;
    }

    const re = /(:[-+_0-9a-zA-Z]+:)$/g;
    const matches = re.exec(message.substring(0, selectionStart));

    if (matches) {
      setMessage(
        `${message.substring(
          0,
          selectionStart - matches[1].length,
        )}${message.substring(selectionEnd, message.length)}`,
      );
      setSelectionStart(selectionStart - matches[1].length);
      setSelectionEnd(selectionEnd - matches[1].length);
      return;
    }

    setMessage(
      `${message.substring(0, selectionStart - 1)}${message.substring(
        selectionEnd,
        message.length,
      )}`,
    );
    setSelectionStart(selectionStart - 1);
    setSelectionEnd(selectionEnd - 1);
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
        ? `Maximum message length is ${maxMessageLength} characters`
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
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        maxWidth={theme.breakpoints.values.md}
        zIndex={0}
        style={{ backgroundColor: theme.palette.secondary.dark }}
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
            onClick={(event) =>
              handleSubmit(
                event,
                userData,
                lastMessageDate,
                setLastMessageDate,
                setMessage,
                setSelectionStart,
                setSelectionEnd,
                message,
              )
            }
          />
        </Box>
        <Collapse in={isEmojiListShown}>
          <Box display='flex' flexDirection='column' height='280px'>
            <Divider />
            <Box style={style.emojiListStyle}>
              <TabPanel value={tab} index={0}>
                <Picker
                  set='google'
                  showPreview={false}
                  showSkinTones={false}
                  theme={theme.palette.type}
                  color={theme.palette.secondary.main}
                  style={{ width: '100%', height: '100%', borderRadius: 0 }}
                  onSelect={(emoji: EmojiData) =>
                    insertIntoMessage(emoji.colons || '')
                  }
                  emojisToShowFilter={(emoji: any) =>
                    emoji.short_names[0] !== 'middle_finger'
                  }
                  recent={['bug', 'beetle', 'ant']}
                />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <Box>
                  <GiphySelect onClick={handleGiphyClick} />
                </Box>
              </TabPanel>
            </Box>
            <Divider />
            <Box display='flex'>
              <DeleteButton onClick={handleDelete} />
              <Tabs
                value={tab}
                onChange={(_event: React.ChangeEvent<any>, n: number) =>
                  setTab(n)
                }
                variant='fullWidth'
                indicatorColor='primary'
                textColor='secondary'
                aria-label='Content type tabs'
                style={{ flexGrow: 1 }}
              >
                <Tab icon={<MoodIcon />} aria-label='Emojis' />
                <Tab icon={<GifIcon />} aria-label='GIFs' />
              </Tabs>
              <NewLineButton onClick={() => insertIntoMessage('\n')} />
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default MessageForm;
