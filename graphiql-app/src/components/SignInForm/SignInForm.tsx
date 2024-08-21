import { Box, Button, TextField, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from '../../constants/SERVICE_MESSAGES';

const SignInForm = () => {
  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        m: ' 0 auto',
      }}
    >
      <Typography component='h1' variant='h4'>
        {SERVICE_MESSAGES.signInText}
      </Typography>
      <Box
        component='form'
        sx={{
          my: '20px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '25px',
        }}
      >
        <TextField id='form-email' label='Email' />
        <TextField type='password' id='form-password' label='Password' />
        <Button size='large' variant='contained'>
          {SERVICE_MESSAGES.signInText}
        </Button>
      </Box>
    </Box>
  );
};

export { SignInForm };
