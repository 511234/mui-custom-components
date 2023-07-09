import { Alert, AlertColor, Snackbar, SnackbarProps } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';

export interface ISnackbarMui extends SnackbarProps {
  handleOpen?: () => void;
  handleClose?: () => void;
  setMessage?: (msg) => void;
  severity: AlertColor | undefined;
}

const SnackbarMui = forwardRef<any, ISnackbarMui>((props, ref) => {
  const [snackbarMsg, setSnackbarMsg] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { severity } = props;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const setMessage = (msg: string) => {
    setSnackbarMsg(msg);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        handleClose,
        handleOpen,
        setMessage,
      };
    },
    []
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={props.autoHideDuration || 2000}
      onClose={handleClose}
    >
      <Alert
        severity={severity || 'success'}
        sx={{ whiteSpace: 'pre-line', width: '100%' }}
      >
        {snackbarMsg}
      </Alert>
    </Snackbar>
  );
});

export default SnackbarMui;
