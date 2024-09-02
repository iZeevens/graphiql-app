'use client';

import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import LanguageToggler from '@/components/header/components/LanguageToggler/LanguageToggler';
import LogoBlock from '@/components/header/components/LogoBlock/LogoBlock';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { theme } from '@/theme';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { useAuth } from '../../hooks/useAuth';
import { SignButton } from './components/SignButton/SignButton';
import { SignOutButton } from './components/SignOutButton/SignOutButton';

import styles from '@/components/header/Header.module.scss';

const Header = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { user } = useAuth();
  const translation = useTranslations('headerBtns');

  return (
    <AppBar
      className={styles.header}
      sx={{
        backgroundColor: !trigger
          ? theme.palette.primary.contrastText
          : theme.palette.secondary.light,
        boxShadow: !trigger ? 'none' : '',
      }}
    >
      <Container className={styles.container}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Link href={useLocalizedPath('/')}>
            <LogoBlock />
          </Link>
          <LanguageToggler />
          {/* <BurgerMenu /> */}
          {/* <NavMenu /> */}
          {user ? (
            <SignOutButton />
          ) : (
            <Box component='div' sx={{ display: 'flex', columnGap: '10px' }}>
              <SignButton buttonName={translation('signIn')} path={'/signin'} />
              <SignButton buttonName={translation('signUp')} path={'/signup'} />
            </Box>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
