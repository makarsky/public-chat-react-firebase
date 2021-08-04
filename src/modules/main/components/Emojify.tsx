import React from 'react';
import { Emoji, EmojiData, EmojiProps } from 'emoji-mart';

const re = /(:[-+_0-9a-zA-Z]+:)/g;

export const getEmojiNames = (
  message: string,
  emojiNames: string[] = [],
): string[] => {
  const newMatches = re.exec(message);

  if (!newMatches) {
    return emojiNames;
  }

  emojiNames.push(newMatches[0]);

  return getEmojiNames(message, emojiNames);
};

const getEscapedEmojiNames = (emojiNames: string[]): string[] => {
  return emojiNames.map((name) =>
    name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
  );
};

interface EmojifyProps {
  children: string;
  makeTheOnlyEmojiBigger?: boolean;
}

const Emojify = ({ children, makeTheOnlyEmojiBigger }: EmojifyProps) => {
  const emojiNames = getEmojiNames(children);
  const escapedEmojiNames = getEscapedEmojiNames(emojiNames);

  if (emojiNames.length) {
    const emojiNamesRegExp = new RegExp(escapedEmojiNames.join('|'));
    const rawStrings = children.split(emojiNamesRegExp);

    const size =
      makeTheOnlyEmojiBigger &&
      emojiNames.length === 1 &&
      rawStrings.filter((s) => s).length === 0
        ? 27
        : 23;

    const strings = [];

    for (let i = 0; i < rawStrings.length; i += 1) {
      strings.push(rawStrings[i]);
      if (emojiNames[i]) {
        strings.push(
          <Emoji
            set='google'
            emoji={emojiNames[i]}
            size={size}
            key={i}
            fallback={(_emoji: EmojiData, props: EmojiProps) => {
              // eslint-disable-next-line react/prop-types
              return <>{props.emoji}</>;
            }}
          />,
        );
      }
    }

    return <>{strings}</>;
  }

  return <>{children}</>;
};

Emojify.defaultProps = {
  makeTheOnlyEmojiBigger: true,
};

export default Emojify;
