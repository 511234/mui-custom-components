import { Button, ButtonProps } from '@mui/material';

type TButtonMui = ButtonProps & {
  text: string;
};

const ButtonMui = (props: TButtonMui) => {
  const { text, ...others } = props;
  return (
    <>
      <Button color="primary" sx={{ my: 0 }} variant="text" {...others}>
        {text}
      </Button>
    </>
  );
};

export default ButtonMui;
