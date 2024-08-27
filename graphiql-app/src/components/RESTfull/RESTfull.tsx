import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

// import JSONPretty from 'react-json-pretty';

// Базовая разметка, она скоро поменяется

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
                  <Select label='Method' fullWidth variant='outlined'>
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

              <Box mt={2}>
                <Button variant='contained' color='primary'>
                  Send Request
                </Button>
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

              {/* <JSONPretty /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Restfull;
