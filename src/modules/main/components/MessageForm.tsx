import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  Tabs,
  Tab,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
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
import UserData from '../interfaces/UserData';
import EmojiButton from './EmojiButton';
import TabPanel from './TabPanel';
import GiphySelect from './GiphySelect';
import { isCoolDownActive } from '../utils/cooldown';
import Emojify, { getEmojiNames } from './Emojify';

const maxNumberOfEmojis = 36;
const maxNumberOfRows = 6;

const maxNumberOfEmojisMessage = `The maximum number of emojis is ${maxNumberOfEmojis}`;
const maxNumberOfRowsMessage = `Only ${maxNumberOfRows} rows are allowed`;

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
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmojiListShown, setIsEmojiListShown] = useState(false);
  const [tab, setTab] = useState(0);
  const inputRef = useRef() as MutableRefObject<HTMLDivElement>;
  const theme = useTheme();

  useEffect(
    () => setLastMessageDate(getLastSubmissionDate(userData)),
    [userData],
  );

  useEffect(
    () =>
      inputRef?.current?.scrollIntoView({
        block: 'end',
      }),
    [message],
  );

  const style: Record<string, CSSProperties> = {
    emojiListStyle: {
      overflowX: 'hidden',
      overflowY: 'auto',
      flexGrow: 1,
    },
  };

  const insertIntoMessage = (text: string) => {
    const newMessage = message + text;
    const emojiNames = getEmojiNames(newMessage);

    if (emojiNames.length > maxNumberOfEmojis) {
      setError(true);
      setErrorMessage(maxNumberOfEmojisMessage);
      return;
    }
    if (newMessage.split(/\r\n|\r|\n/).length > maxNumberOfRows) {
      setError(true);
      setErrorMessage(maxNumberOfRowsMessage);
      return;
    }

    setError(false);
    setMessage(newMessage);
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

  const handleDelete = () => {
    const re = /(:[-+_0-9a-zA-Z]+:)$/g;
    const matches = re.exec(message);
    setError(false);

    if (matches) {
      setMessage(message.substring(0, message.length - matches[1].length));
      return;
    }

    setMessage(message.substring(0, message.length - 1));
  };

  return (
    <ClickAwayListener onClickAway={() => setIsEmojiListShown(false)}>
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
            <EmojiButton
              value={isEmojiListShown}
              onClick={setIsEmojiListShown}
            />
            {message.length === 0 ? (
              <Box
                width='100%'
                style={{
                  padding: '10px 6px',
                  color: theme.palette.grey[600],
                }}
                onClick={() => setIsEmojiListShown(true)}
              >
                Enter emoji...
              </Box>
            ) : null}
            {message.length > 0 ? (
              <Box width='100%' padding='6px 6px'>
                <Box
                  whiteSpace='break-spaces'
                  width='100%'
                  maxHeight='16vh'
                  overflow='auto'
                  onClick={() => setIsEmojiListShown(true)}
                >
                  <Emojify makeTheOnlyEmojiBigger={false}>{message}</Emojify>
                  {/* The following element helps displaying a new line */}
                  <div
                    style={{ display: 'inline-block', height: '23px' }}
                    ref={inputRef}
                  />
                </Box>
                {error ? (
                  <Typography
                    variant='caption'
                    component='div'
                    align='center'
                    color='error'
                  >
                    {errorMessage}
                  </Typography>
                ) : null}
              </Box>
            ) : null}
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
                  message,
                )
              }
            />
          </Box>
          <Box
            height='42vh'
            maxHeight='280px'
            style={{
              display: isEmojiListShown ? 'flex' : 'none',
              flexDirection: 'column',
            }}
          >
            <Divider />
            <Box style={style.emojiListStyle}>
              <TabPanel value={tab} index={0}>
                <Picker
                  set='google'
                  showPreview={false}
                  showSkinTones={false}
                  theme={theme.palette.type}
                  color={theme.palette.secondary.main}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                  }}
                  onSelect={(emoji: EmojiData) =>
                    insertIntoMessage(emoji.colons || '')
                  }
                  emojisToShowFilter={(emoji: any) =>
                    emoji.short_names[0] !== 'middle_finger'
                  }
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
                style={{ flexGrow: 1, minHeight: '40px' }}
              >
                <Tab
                  icon={<MoodIcon />}
                  aria-label='Emojis'
                  style={{ minHeight: 'initial' }}
                />
                <Tab
                  icon={<GifIcon />}
                  aria-label='GIFs'
                  style={{ minHeight: 'initial' }}
                />
              </Tabs>
              <NewLineButton onClick={() => insertIntoMessage('\n')} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default MessageForm;
