import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';

// import styles from '@/components/GraphQl/GraphQl.module.scss';

const GraphQl = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card component='form'>
            <Typography variant='h6' gutterBottom>
              GraphQl Client
            </Typography>

            <Grid container>
              <Grid item>
                <TextField label='Endpoint URL' fullWidth variant='outlined' />
              </Grid>
              <Grid item>
                <TextField label='SDL URL' fullWidth variant='outlined' />
              </Grid>
              {/* Headers RESTFULL & CodeMirror & variables  will be here */}

              <Grid item>
                <Button variant='contained' color='primary' type='submit'>
                  Send Request
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphQl;
