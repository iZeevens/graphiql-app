import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useAuthActions } from '@/hooks/useAuthActions';
import { useCurrentLanguage } from '@/hooks/useCurrentLanguage';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface IMenuProps {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: (path: string) => void;
  anchorElNav: HTMLElement | null;
}

const BurgerMenu = ({
  handleOpenNavMenu,
  handleCloseNavMenu,
  anchorElNav,
}: IMenuProps) => {
  const actions = useAuthActions();
  const t = useTranslations('header');
  const lang = useCurrentLanguage();
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'
        sx={{ padding: 0 }}
      >
        <MenuIcon fontSize='large' />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {actions.map(action => (
          <MenuItem key={action.name}>
            {action.path ? (
              <Link href={`${lang}/${action.path}`}>
                <Typography>{t(`${action.name}Btn`)}</Typography>
              </Link>
            ) : (
              <Typography onClick={action.onClick}>
                {t(`${action.name}Btn`)}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default BurgerMenu;
