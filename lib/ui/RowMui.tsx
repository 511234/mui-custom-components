import { Grid } from '@mui/material';

const RowMui = ({ children, ...props }) => {
  return (
    <Grid
      alignItems="center"
      container
      spacing={2}
      sx={{ margin: 0, padding: 0 }}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default RowMui;
