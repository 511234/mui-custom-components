import {Button, ButtonProps} from '@mui/material';

const ButtonMui = ({text, ...others}: ButtonProps<"button", { text: string }>) => {
  return (
    <Button color="primary" sx={{my: 0}} variant="text" {...others}>
      {text}
    </Button>
  );
};

export default ButtonMui;
