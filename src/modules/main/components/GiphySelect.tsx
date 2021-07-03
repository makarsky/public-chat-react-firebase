import React, { FunctionComponent, useState } from 'react';
import { IGif } from '@giphy/js-types';
import { Grid } from '@giphy/react-components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ResizeObserver from 'react-resize-observer';
import GiphyService from '../../../service/GiphyService';

// https://codesandbox.io/s/giphyreact-components-hbmcf?from-embed=&file=/src/index.tsx

interface GiphySelectProps {
  onClick: (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => void;
}

const GiphySelect: FunctionComponent<GiphySelectProps> = ({
  onClick,
}: GiphySelectProps) => {
  const fetchGifs = (offset: number) =>
    GiphyService.trending({ offset, limit: 10 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Grid
        onGifClick={onClick}
        fetchGifs={fetchGifs}
        width={windowWidth}
        columns={matches ? 4 : 2}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWindowWidth(width);
        }}
      />
    </>
  );
};

export default GiphySelect;
