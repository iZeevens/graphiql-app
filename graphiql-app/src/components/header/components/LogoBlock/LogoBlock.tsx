import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Logo from '@/components/UI/icons/Logo';
import { useTranslations } from 'next-intl';

import styles from '@/components/header/components/LogoBlock/LogoBlock.module.scss';

const LogoBlock = () => {
  const t = useTranslations('logo');
  return (
    <Stack direction='row' className={styles.logo}>
      <Logo />
      <Typography variant='h2'>{t('logo')}</Typography>
    </Stack>
  );
};

export default LogoBlock;
