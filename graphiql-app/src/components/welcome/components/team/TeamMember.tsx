import { Typography } from '@mui/material';

import { ITeamMember } from '@/constants/TEAM';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from '@/components/welcome/components/team/TeamMember.module.scss';

interface TeamMemberProps {
  member: ITeamMember;
}

export function TeamMember({ member }: TeamMemberProps) {
  const t = useTranslations('team');

  return (
    <Link className={styles.teamMember} href={member.github} target='_blank'>
      <Typography variant='h3'>{t(member.name)}</Typography>
      <Typography variant='body1'>{t(`${member.name}Desc`)}</Typography>
    </Link>
  );
}
