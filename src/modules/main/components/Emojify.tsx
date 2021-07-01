import React from 'react';
import { Emoji } from 'emoji-mart';

const re = /(:[-+_0-9a-zA-Z]+?:)/g;

const getEmojiNames = (message: string, emojiNames: string[]): string[] => {
  const newMatches = re.exec(message);

  if (!newMatches) {
    return emojiNames;
  }

  emojiNames.push(newMatches[0]);

  return getEmojiNames(message, emojiNames);
};

interface EmojifyProps {
  children: string;
}

const Emojify = ({ children }: EmojifyProps) => {
  const emojiNames = getEmojiNames(children, []);

  if (emojiNames.length) {
    const emojiNamesRegExp = new RegExp(emojiNames.join('|'));
    const rawStrings = children.split(emojiNamesRegExp);

    const size =
      emojiNames.length === 1 && rawStrings.filter((s) => s).length === 0
        ? 27
        : 23;

    const strings = [];

    for (let i = 0; i < rawStrings.length; i += 1) {
      strings.push(rawStrings[i]);
      if (emojiNames[i]) {
        strings.push(
          <Emoji set='google' emoji={emojiNames[i]} size={size} key={i} />,
        );
      }
    }

    return <>{strings}</>;
  }

  return <>{children}</>;
};

export default Emojify;
