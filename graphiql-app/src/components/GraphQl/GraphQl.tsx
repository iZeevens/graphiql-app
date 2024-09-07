import { Box, Card, Grid, Typography } from '@mui/material';

const GraphQl = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container>
        <Grid item>
          <Card component='form'>
            <Typography variant='h6' gutterBottom>
              GraphQl Client
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphQl;
