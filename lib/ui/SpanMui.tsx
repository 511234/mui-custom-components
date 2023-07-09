import { Typography, TypographyProps } from '@mui/material';

type ISpanMuiProps = TypographyProps & {
  children?: any;
  style?: any;
};

const SpanMui = ({ children, style = {} }: ISpanMuiProps) => {
  return (
    <Typography component="span" variant="body1" sx={style}>
      {children}
    </Typography>
  );
};

export default SpanMui;
