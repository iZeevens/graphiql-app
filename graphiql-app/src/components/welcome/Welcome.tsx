'use client';

import Container from '@mui/material/Container';

import Greeting from '@/components/welcome/components/greeting/Greeting';
import { ProjectInfo } from '@/components/welcome/components/projectInfo/ProjectInfo';
import { Team } from '@/components/welcome/components/team/Team';
import { useAuth } from '@/hooks/useAuth';

export function Welcome() {
  const { user, loading } = useAuth();

  return (
    <>
      {loading ? (
        <Container sx={{ textAlign: 'center' }}>Loading...</Container>
      ) : (
        <Greeting user={user} />
      )}
      <ProjectInfo />
      <Team />
    </>
  );
}
