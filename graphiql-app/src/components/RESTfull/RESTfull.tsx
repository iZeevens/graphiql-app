import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const Restfull = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                REST Client
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField label='Method' fullWidth variant='outlined' />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label='Endpoint URL'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant='subtitle1'>Headers:</Typography>
                <Button variant='contained' color='primary'>
                  Add Header
                </Button>
              </Box>
              <Box mt={2}>
                <TextField
                  label='Header Key'
                  fullWidth
                  variant='outlined'
                  sx={{ mb: 2 }}
                />
                <TextField label='Header Value' fullWidth variant='outlined' />
              </Box>

              <Box mt={3}>
                <Typography variant='subtitle1'>Body:</Typography>
                <TextField
                  label='JSON/Text Editor'
                  fullWidth
                  variant='outlined'
                  multiline
                  rows={4}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Response
              </Typography>

              <TextField
                label='Status'
                fullWidth
                variant='outlined'
                sx={{ mb: 3 }}
              />

              <TextField
                label='Read-Only JSON Viewer'
                fullWidth
                variant='outlined'
                multiline
                rows={4}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Restfull;
