import React, { FunctionComponent, MouseEventHandler } from 'react';
import Box from '@material-ui/core/Box';
import { Chip, Slide } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface ScrollDownChipProps {
  show: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  label: string;
  showLabel: boolean;
}

const ScrollDownChip: FunctionComponent<ScrollDownChipProps> = ({
  show,
  onClick,
  label,
  showLabel,
}: ScrollDownChipProps) => {
  return (
    <Box position='relative' display='flex' justifyContent='center' height='0'>
      <Slide direction='up' in={show} mountOnEnter unmountOnExit>
        <Box position='absolute' bottom='18px'>
          <Chip
            label={
              <Box display='flex' alignItems='center'>
                {showLabel && label}
                <ExpandMore />
              </Box>
            }
            onClick={onClick}
          />
        </Box>
      </Slide>
    </Box>
  );
};

export default ScrollDownChip;
