import React, { FunctionComponent } from 'react';
import { TextField, withStyles, TextFieldProps } from '@material-ui/core';

const StyledInput = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      transform: 'translate(6px, -50%)',
      top: '50%',
    },
    '& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-shrink': {
      display: 'none',
    },
    '& .MuiInputBase-root.MuiFilledInput-root': {
      background: 'transparent',
      padding: '10px 6px',
    },
    '& .MuiFilledInput-underline::after': {
      display: 'none',
    },
    '& .MuiFilledInput-underline::before': {
      display: 'none',
    },
  },
})(TextField);

const StyledTextField: FunctionComponent<TextFieldProps> = (
  props: TextFieldProps,
) => {
  /* eslint-disable react/jsx-props-no-spreading */
  return <StyledInput {...props} />;
};

export default StyledTextField;
