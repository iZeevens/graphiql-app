'use client';

import { Alert, Box, Button, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { SERVICE_MESSAGES } from '../../constants/SERVICE_MESSAGES';
import { ISignInFormData } from '../../types/formsType';
import { logInWithEmailAndPassword } from '../../utils/auth';
import { schemaSignIn } from '../../utils/validationSchema';

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
    const { email, password } = data;
    const userCredential = await logInWithEmailAndPassword(
      { email, password },
      setError,
    );

    if (userCredential === true) router.push('/');
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
              ? SERVICE_MESSAGES.wrongEmail
              : SERVICE_MESSAGES.wrongPassword}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export { SignInForm };
