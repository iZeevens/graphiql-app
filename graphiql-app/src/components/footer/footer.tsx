import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import GitHub from '@/components/UI/icons/GitHub';
import RSSchool from '@/components/UI/icons/RSSchool';
import { developers } from '@/components/footer/developers';
import { getGithubName } from '@/components/footer/getGithubName';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from '@/components/footer/Footer.module.scss';

const Footer = () => {
  const t = useTranslations('footer');
  return (
    <Box component='footer' className={styles.footer}>
      <Container className={styles.footer__container}>
        <List className={styles.footer__list}>
          {developers.map(developer => (
            <ListItem className={styles.footer__item} key={developer.name}>
              <Typography className={styles.footer__title}>
                {t(developer.name)}
              </Typography>
              <Link
                className={styles.footer__link}
                href={developer.github}
                target='_blank'
              >
                <ListItemIcon className={styles.footer__icon}>
                  <GitHub />
                </ListItemIcon>
                {getGithubName(developer.github)}
              </Link>
            </ListItem>
          ))}
          <ListItem className={styles.footer__item}>
            <Typography className={styles.footer__title}>
              {t('joinCommunity')}
            </Typography>
            <Link
              href='https://rs.school/courses/reactjs'
              target='_blank'
              className={styles.footer__link}
            >
              <ListItemIcon className={styles.footer__icon}>
                <RSSchool />
              </ListItemIcon>
              RS School
            </Link>
          </ListItem>
        </List>
        <Typography className={styles.footer__copyright}>
          {t('copyright')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
