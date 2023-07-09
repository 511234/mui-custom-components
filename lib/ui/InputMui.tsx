import { InputLabel, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

type IInputMui = TextFieldProps & {
  label: string;
  showInputLabel?: boolean;
};

const InputMui = forwardRef<any, IInputMui>((props, ref) => {
  return (
    <>
      {props.showInputLabel && (
        <InputLabel id={`textfield-mui-input-label-${props.label}`}>
          {props.label}
        </InputLabel>
      )}
      <TextField
        autoComplete="off"
        fullWidth
        margin="normal"
        inputRef={ref}
        size="small"
        type="text"
        variant="outlined"
        {...props}
      />
    </>
  );
});

export default InputMui;
