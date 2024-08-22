'use client';
import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { SERVICE_MESSAGES } from '../../constants/SERVICE_MESSAGES';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/fireBaseConfig';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@/utils/validationSchema';
import Inputs from '@/types/formsType';

const registerWithEmailAndPassword = async (
  { email, password }: Inputs,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    document.cookie = `userid=${res.user.uid}}`;
    console.log(res);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
  }
};

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema), mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { email, password } = data;
    console.log(data);
    setError(null);
    await registerWithEmailAndPassword({ email, password }, setError);
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
          helperText={errors.password?.message}
        />
        <Button type='submit' size='large' variant='contained'>
          {SERVICE_MESSAGES.signUpText}
        </Button>
        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export { SignUpForm };
