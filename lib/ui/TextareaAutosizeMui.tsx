import {
  FormHelperText,
  InputLabel,
  TextareaAutosize,
  TextareaAutosizeProps,
} from '@mui/material';
import { forwardRef } from 'react';

interface ITextareaAutosizeMui extends TextareaAutosizeProps {
  error?: boolean;
  helperText?: string | null;
  label: string;
  style?: any;
}

const TextareaAutosizeMui = forwardRef<any, ITextareaAutosizeMui>(
  (props, ref) => {
    const { label, error, helperText, ...others } = props;
    const style = props.style ?? {
      borderColor: '#aaa',
      borderRadius: '5px',
      width: '100%',
    };

    return (
      <>
        <InputLabel id={`textarea-autosize-mui-input-label-${label}`}>
          {label}
        </InputLabel>
        <TextareaAutosize
          style={style}
          {...others}
          ref={ref}
        />
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </>
    );
  }
);

export default TextareaAutosizeMui;
