import React, { useState, FunctionComponent } from 'react';
import { Box, IconButton, Tab, Tabs } from '@material-ui/core';
import emojiGroups from '../configs/emojis';
import TabPanel from './TabPanel';

const emojiGroupTabs = emojiGroups.map((set: Array<string>) => (
  <Tab icon={<>{set[0]}</>} />
));

const emojiTabPanels = emojiGroups.map(
  (group: Array<string>, groupIndex: number) => {
    const groupKey = `emojiGroup-${groupIndex}`;

    return (
      <TabPanel key={groupKey} value={groupIndex} index={groupIndex}>
        <Box px={1} display='flex' flexWrap='wrap' justifyContent='center'>
          {group.map((emoji: string, emojiIndex: number) => {
            const emojiKey = `emoji-${groupIndex}-${emojiIndex}`;

            return (
              <IconButton
                key={emojiKey}
                type='button'
                size='medium'
                style={{ padding: '8px', color: 'initial' }}
              >
                {emoji}
              </IconButton>
            );
          })}
        </Box>
      </TabPanel>
    );
  },
);

interface EmojiSelectProps {
  onClick: (emoji: string) => void;
}

const EmojiSelect: FunctionComponent<EmojiSelectProps> = ({
  onClick,
}: EmojiSelectProps) => {
  const [tab, setTab] = useState(0);

  const handleEmojiClick = (e: React.SyntheticEvent<any, Event>) => {
    if (
      e.target instanceof HTMLSpanElement ||
      e.target instanceof HTMLButtonElement
    ) {
      onClick(e.target.textContent || '');
    }
  };

  return (
    <>
      <Box>
        <Tabs
          value={tab}
          onChange={(_event: React.ChangeEvent<any>, n: number) => setTab(n)}
          variant='scrollable'
          indicatorColor='secondary'
          textColor='secondary'
          aria-label='Emoji groups'
        >
          {emojiGroupTabs}
        </Tabs>
      </Box>
      <Box flexGrow='1' onClick={handleEmojiClick}>
        {emojiTabPanels[tab]}
      </Box>
    </>
  );
};

export default EmojiSelect;
