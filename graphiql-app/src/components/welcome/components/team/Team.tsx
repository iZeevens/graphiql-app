import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { TeamMember } from '@/components/welcome/components/team/TeamMember';
import { TEAM } from '@/constants/TEAM';
import { useTranslations } from 'next-intl';

import styles from '@/components/welcome/components/team/Team.module.scss';

export function Team() {
  const t = useTranslations('team');

  return (
    <Container className={styles.team} component='section'>
      <Typography variant='h2'>{t('title')}</Typography>
      <Stack className={styles.team__members}>
        {TEAM.map(teamMember => {
          return <TeamMember key={teamMember.name} member={teamMember} />;
        })}
      </Stack>
    </Container>
  );
}
