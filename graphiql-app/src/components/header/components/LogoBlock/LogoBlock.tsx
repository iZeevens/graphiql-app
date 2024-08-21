import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Logo from '@/components/UI/icons/Logo';

import styles from '@/components/header/components/LogoBlock/LogoBlock.module.scss';

const LogoBlock = () => {
  return (
    <Stack className={styles.logo}>
      <Logo />
      <Typography variant='h1'>Girrit</Typography>
    </Stack>
  );
};

export default LogoBlock;
