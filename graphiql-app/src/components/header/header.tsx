'use client';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import LogoBlock from '@/components/header/components/LogoBlock/LogoBlock';
import styles from '@/components/header/Header.module.scss';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { theme } from '@/theme';
import Link from 'next/link';

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
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
        boxShadow: !trigger ? 'none' : '',
      }}
    >
      <Container className={styles.container}>
        <Stack>
          <Link href='/'>
            <LogoBlock />
          </Link>
          {/* <BurgerMenu /> */}
          {/* <NavMenu /> */}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
