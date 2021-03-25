import React, { FunctionComponent } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader: FunctionComponent = () => {
  return (
    <Backdrop open>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Loader;
