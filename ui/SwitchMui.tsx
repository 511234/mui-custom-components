import { InputLabel, Switch, SwitchProps } from '@mui/material';
import { forwardRef } from 'react';

type TSwitchMui = SwitchProps & {
  label: string;
  showInputLabel?: boolean;
};

const SwitchMui = forwardRef((props: TSwitchMui, ref: any) => {
  const { label, showInputLabel, ...others } = props;
  return (
    <div style={{ width: '100%' }}>
      {showInputLabel && (
        <InputLabel id={`switch-mui-input-label-${props.label}`}>
          {props.label}
        </InputLabel>
      )}
      <Switch {...others} ref={ref} />
    </div>
  );
});

export default SwitchMui;
