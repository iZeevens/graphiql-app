'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from '../../constants/SERVICE_MESSAGES';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

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
        {SERVICE_MESSAGES.signUpText}
      </Typography>
      <Box
        component='form'
        sx={{
          my: '20px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '25px',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id='form-email'
          label='Email'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type='password'
          id='form-password'
          label='Password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.email?.message}
        />
        <Button type='submit' size='large' variant='contained'>
          {SERVICE_MESSAGES.signUpText}
        </Button>
      </Box>
    </Box>
  );
};

export { SignUpForm };
