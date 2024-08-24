'use client';

import { Alert, Box, Button, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ISignUpFormData } from '@/types/formsType';
import { auth } from '@/utils/fireBaseConfig';
import { schemaSignUp } from '@/utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { SERVICE_MESSAGES } from '../../constants/SERVICE_MESSAGES';
import PasswordStrength from '../passwordStrength/passwordStrength';

const registerWithEmailAndPassword = async (
  { name, email, password }: ISignUpFormData,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      return true;
    }

    document.cookie = `userid=${res.user.uid}`;
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
    watch,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: yupResolver(schemaSignUp),
    mode: 'onChange',
  });
  const router = useRouter();
  const password = watch('password');
  const onSubmit: SubmitHandler<ISignUpFormData> = async data => {
    setError(null);
    const { name, email, password } = data;
    const userCredential = await registerWithEmailAndPassword(
      { name, email, password },
      setError,
    );

    if (userCredential === true) router.push('/');
  };

  const t = useTranslations('signUp');

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
        {t('title')}
      </Typography>
      <Box
        component='form'
        sx={{
          my: '20px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '25px',
          width: '320px',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id='form-name'
          label='UserName'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
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
        <PasswordStrength password={password} />
        <Button type='submit' size='large' variant='contained'>
          {SERVICE_MESSAGES.signUpText}
        </Button>
        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error === 'Firebase: Error (auth/wrong-password).'
              ? SERVICE_MESSAGES.wrongPassword
              : SERVICE_MESSAGES.wrongEmail}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export { SignUpForm };
