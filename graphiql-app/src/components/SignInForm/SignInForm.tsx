'use client';

import { Alert, Box, Button, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { ISignInFormData } from '../../types/formsType';
import { logInWithEmailAndPassword } from '../../utils/auth';
import { schemaSignIn } from './helpers/signInSchema';

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const translation = useTranslations('signIn');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormData>({
    resolver: yupResolver(schemaSignIn),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignInFormData> = async data => {
    setError(null);
    try {
      const { email, password } = data;
      const userCredential = await logInWithEmailAndPassword({
        email,
        password,
      });

      if (userCredential === true) router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
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
        {translation('title')}
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          my: '20px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '25px',
        }}
      >
        <TextField
          id='form-email'
          label={translation('emailPlaceholder')}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type='password'
          id='form-password'
          label={translation('passwordPlaceholder')}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type='submit' size='large' variant='contained'>
          {translation('signInBtn')}
        </Button>
        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error === 'Firebase: Error (auth/invalid-email).'
              ? translation('wrongEmail')
              : translation('wrongPassword')}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export { SignInForm };
