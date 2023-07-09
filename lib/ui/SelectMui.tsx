import {
  MenuItem,
  InputLabel,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { forwardRef } from 'react';

type ISelectMuiProps = TextFieldProps & {
  isOptionDisabled?: boolean;
  label: string;
  options: TMenuItemOptionProps[];
  SelectProps?: SelectProps;
  showInputLabel?: boolean;
};

export type TMenuItemOptionProps<VT = any> = {
  icon?: JSX.Element;
  label: string;
  value: VT;
};

const SelectMui = forwardRef((props: ISelectMuiProps, ref: any) => {
  const { isOptionDisabled, label, options, ...others } = props;
  return (
    <>
      {props.showInputLabel && (
        <InputLabel id={`select-mui-input-label-${label}`}>{label}</InputLabel>
      )}
      <TextField
        defaultValue={props.defaultValue ?? ''}
        fullWidth
        label={label}
        inputRef={ref}
        margin="normal"
        select
        size="small"
        SelectProps={{
          SelectDisplayProps: {
            style: { display: 'flex', alignItems: 'end', columnGap: '1em' },
          },
          ...props.SelectProps,
        }}
        {...others}
      >
        {options.map((option) => (
          <MenuItem
            disabled={isOptionDisabled}
            key={option.label}
            sx={{ display: 'flex', alignItems: 'center', columnGap: '1em' }}
            value={option.value}
          >
            {option.icon}
            <span>{option.label}</span>
          </MenuItem>
        ))}
      </TextField>
    </>
  );
});

export default SelectMui;
