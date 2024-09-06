'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <Container sx={{ height: '100%' }}>
      <Stack alignItems='center' height='100%' justifyContent='center' gap={3}>
        <Typography variant='h1' fontSize='8rem' fontWeight='bold'>
          404
        </Typography>
        <Typography variant='h2'>{t('message')}</Typography>
        <Link href={useLocalizedPath('/')}>
          <Button>{t('button')}</Button>
        </Link>
      </Stack>
    </Container>
  );
}
