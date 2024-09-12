'use client';

import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { useState } from 'react';

import BurgerMenu from '@/components/header/components/BurgerMenu/BurgerMenu';
import LanguageToggler from '@/components/header/components/LanguageToggler/LanguageToggler';
import { Logo } from '@/components/header/components/Logo/Logo';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { theme } from '@/theme';
import Link from 'next/link';

import { AuthButtons } from './components/AuthButtons/AuthButtons';

import styles from '@/components/header/Header.module.scss';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null);
    if (typeof path !== 'string') {
      return;
    }
  };

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
      <Container className={styles.header__container}>
        <Link href={useLocalizedPath('/')} className={styles.header__logo}>
          <Logo />
        </Link>
        <LanguageToggler />
        <BurgerMenu
          handleCloseNavMenu={handleCloseNavMenu}
          anchorElNav={anchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
        />
        <Box
          component='div'
          sx={{ columnGap: '10px', display: { xs: 'none', md: 'flex' } }}
        >
          <AuthButtons />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
