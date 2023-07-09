import { FormHelperText, Grid, IconButton, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { forwardRef } from 'react';

const FileUploadMui = forwardRef<any, any>((props, ref) => {
  const { error, helperText, preview, ...others } = props;

  return (
    <>
      {preview && (
        <img
          alt=""
          src={preview}
          style={{
            height: '200px',
            objectFit: 'contain',
            width: '-webkit-fill-available',
          }}
        />
      )}
      <Grid item xs={12}>
        <IconButton
          color="primary"
          component="label"
          disableRipple
          sx={{ justifyContent: 'center', width: '100%' }}
        >
          <FileUploadIcon />
          <Typography variant="body1">
            {props.label ?? 'File Upload'}
          </Typography>
          <input hidden ref={ref} type="file" {...others} />
        </IconButton>
      </Grid>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </>
  );
});

export default FileUploadMui;
