import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type TModalMui = {
  onClose: () => void;
  open: boolean;
  title?: null | string;
  width?: number;
  [key: string]: any;
};

const ModalMui = (props: TModalMui) => {
  const { onClose, open } = props;

  const boxStyle = {
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
    overflow: 'auto',
    width: 'auto',
    height: 'auto',
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...boxStyle, ...props.boxStyle }}>
        <div
          style={{
            display: 'flex',
            justifyContent: props.title ? 'space-between' : 'end',
            width: '100%',
          }}
        >
          {props.title && (
            <>
              <Typography variant="h5" gutterBottom>
                {props.title}
              </Typography>
              <Divider />
            </>
          )}
          <IconButton
            color="primary"
            component="label"
            sx={{
              padding: 0,
              position: 'relative',
              zIndex: 100,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {props.children}
      </Box>
    </Modal>
  );
};

export default ModalMui;
