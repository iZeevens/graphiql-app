import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import styles from '@/components/RESTfull/RESTfull.module.scss';

// Базовая разметка, она скоро поменяется

const Restfull = () => {
  return (
    <Box sx={{ p: 3 }} className={styles['restfull-client']}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card component='form'>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                REST Client
              </Typography>

              <Grid
                container
                className={styles['restfull-client__url-container']}
              >
                <Grid item xs={2}>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel id='method-label'>Method</InputLabel>
                    <Select
                      labelId='method-label'
                      label='Method'
                      fullWidth
                      variant='outlined'
                    >
                      {[
                        'GET',
                        'PUT',
                        'POST',
                        'DELETE',
                        'PATCH',
                        'HEAD',
                        'OPTIONS',
                        'TRACE',
                      ].map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid className={styles['restfull-client__url']} item xs>
                  <TextField
                    label='Endpoint URL'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={styles['restfull-client__button']}
                    variant='contained'
                    color='primary'
                  >
                    Send Request
                  </Button>
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant='subtitle1'>Headers:</Typography>
                <Button variant='contained' color='primary'>
                  Add Header
                </Button>
              </Box>
              {/* <Box mt={2}>
                <TextField
                  label='Header Key'
                  fullWidth
                  variant='outlined'
                  sx={{ mb: 2 }}
                />
                <TextField label='Header Value' fullWidth variant='outlined' />
              </Box> */}

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
                InputProps={{
                  readOnly: true,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Restfull;
