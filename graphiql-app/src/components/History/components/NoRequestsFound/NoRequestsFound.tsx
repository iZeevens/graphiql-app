import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from '@/components/History/components/NoRequestsFound/NoRequestsFound.module.scss';

export const NoRequestsFound = () => {
  const t = useTranslations('history');
  return (
    <Container className={styles.noRequests}>
      <Typography variant='h1'>{t('noRequests')}</Typography>
      <Stack spacing={1} direction='row'>
        <Link href='/rest'>
          <Typography className={styles.noRequests__link} variant='body1'>
            {t('restLink')}
          </Typography>
        </Link>
        <Link href='/graphiql'>
          <Typography className={styles.noRequests__link} variant='body1'>
            {t('graphiqlLink')}
          </Typography>
        </Link>
      </Stack>
    </Container>
  );
};
