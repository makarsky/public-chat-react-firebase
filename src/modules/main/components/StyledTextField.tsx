import React, { useEffect, FunctionComponent } from 'react';
import {
  TextField,
  useTheme,
  withStyles,
  TextFieldProps,
} from '@material-ui/core';

let StyledInput: any = TextField;

const StyledTextField: FunctionComponent<TextFieldProps> = (
  props: TextFieldProps,
) => {
  const theme = useTheme();

  useEffect(() => {
    StyledInput = withStyles({
      root: {
        '& .MuiFilledInput-root': {
          background: theme.palette.secondary.dark,
        },
        '& .MuiFilledInput-underline::after': {
          display: 'none',
        },
        '& .MuiFilledInput-underline::before': {
          display: 'none',
        },
      },
    })(TextField);
  }, [theme]);

  /* eslint-disable react/jsx-props-no-spreading */
  return <StyledInput {...props} />;
};

export default StyledTextField;
