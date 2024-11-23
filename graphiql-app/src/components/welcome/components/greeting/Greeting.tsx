import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import GreetingLink from '@/components/welcome/components/greeting/GreetingLink';
import { BACKGROUND_COLORS } from '@/components/welcome/components/greeting/backgroundColors';
import { formatName } from '@/components/welcome/components/greeting/formatName';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { User } from 'firebase/auth';
import { useTranslations } from 'next-intl';

import styles from '@/components/welcome/components/greeting/Greeting.module.scss';

const Greeting = ({ user }: { user: User | null }) => {
  const t = useTranslations('greeting');
  return (
    <Container component='section'>
      <Stack
        component='section'
        className={`${styles.greeting} ${styles.greeting__wrapper}`}
      >
        <Stack className={styles.greeting__text}>
          <Typography className={styles.greeting__title}>
            {user ? t('greetingAuth') : t('greetingUnAuth')}
          </Typography>
          <Typography
            className={`${styles.greeting__title} ${styles.greeting__title_accent}`}
          >
            {user
              ? formatName(user.displayName ? user.displayName : '')
              : t('greetingAccent')}
          </Typography>
        </Stack>
        <Grid container className={styles.greeting__links}>
          <Grid item className={styles.greeting__link_first}>
            <GreetingLink
              text={user ? t('rest') : t('signIn')}
              path={useLocalizedPath(user ? '/rest' : '/signin')}
              background={BACKGROUND_COLORS.BLUE}
            ></GreetingLink>
          </Grid>
          <Grid item className={styles.greeting__link_second}>
            <GreetingLink
              text={user ? t('history') : ''}
              path={useLocalizedPath(user ? '/history' : '/')}
              background={BACKGROUND_COLORS.GRADIENT}
              isDisabled={!user}
            />
          </Grid>
          <Grid item className={styles.greeting__link_third}>
            <GreetingLink
              text={user ? t('graphiql') : t('signUp')}
              path={useLocalizedPath(user ? '/graphiql' : '/signup')}
              background={BACKGROUND_COLORS.PURPLE}
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Greeting;
