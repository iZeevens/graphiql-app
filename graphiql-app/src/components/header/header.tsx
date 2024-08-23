'use client';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import LanguageToggler from '@/components/header/components/LanguageToggler/LanguageToggler';
import LogoBlock from '@/components/header/components/LogoBlock/LogoBlock';
import { theme } from '@/theme';
import Link from 'next/link';

import styles from '@/components/header/Header.module.scss';

const Header = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

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
          <Link href='/'>
            <LogoBlock />
          </Link>
          <LanguageToggler />
          {/* <BurgerMenu /> */}
          {/* <NavMenu /> */}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
