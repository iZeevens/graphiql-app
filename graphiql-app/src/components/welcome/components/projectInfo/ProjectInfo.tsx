import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslations } from 'next-intl';

import styles from '@/components/welcome/components/projectInfo/ProjectInfo.module.scss';

export function ProjectInfo() {
  const t = useTranslations('projectInfo');
  const infoLines = t('info') ? t('info').split('\n') : [];

  return (
    <Box className={styles.projectInfo} component='section'>
      <Container>
        <Typography variant='h2'>{t('title')}</Typography>
        {infoLines.map((line, index) => (
          <Typography
            className={styles.projectInfo__text}
            key={index}
            paragraph
          >
            {line}
          </Typography>
        ))}
      </Container>
    </Box>
  );
}
