'use client';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import LanguageToggler from '@/components/header/components/LanguageToggler/LanguageToggler';
import LogoBlock from '@/components/header/components/LogoBlock/LogoBlock';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { theme } from '@/theme';
import Link from 'next/link';

import { useAuth } from '../../hooks/useAuth';
import { SignOutButton } from './components/SignOutButton/SignOutButton';

import styles from '@/components/header/Header.module.scss';

const Header = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { user } = useAuth();

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
          {user ? <SignOutButton /> : ''}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
