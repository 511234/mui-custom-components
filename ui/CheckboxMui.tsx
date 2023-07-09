import {
  Checkbox,
  CheckboxProps,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import React, { forwardRef } from 'react';

interface ICheckboxMui extends CheckboxProps {
  label: string;
}

const CheckboxMui = forwardRef<HTMLInputElement, ICheckboxMui>((props, ref) => {
  const { defaultChecked, label, ...others } = props;
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox {...others} inputRef={ref} />}
        label={label}
      />
    </FormGroup>
  );
});

export default CheckboxMui;
