import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslations } from 'next-intl';

import styles from '@/components/welcome/components/baseInfo/BaseInfo.module.scss';

interface BaseInfoProps {
  translations: string;
  theme: 'dark' | 'light';
}

export const BaseInfo = ({ translations, theme }: BaseInfoProps) => {
  const t = useTranslations(translations);
  const paragraphs = t('info') ? t('info').split('\n') : [];

  return (
    <Box
      className={`${styles.info} ${theme === 'dark' ? styles.dark : styles.light}`}
      component='section'
    >
      <Container>
        <Typography variant='h2'>{t('title')}</Typography>
        {paragraphs.map((paragraph, index) => (
          <Typography className={styles.info__text} key={index} paragraph>
            {paragraph}
          </Typography>
        ))}
      </Container>
    </Box>
  );
};
