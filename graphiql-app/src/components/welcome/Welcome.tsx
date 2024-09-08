'use client';

import Container from '@mui/material/Container';

import { BaseInfo } from '@/components/welcome/components/baseInfo/BaseInfo';
import Greeting from '@/components/welcome/components/greeting/Greeting';
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
      <BaseInfo translations='projectInfo' theme='dark' />
      <Team />
      <BaseInfo translations='courseInfo' theme='light' />
    </>
  );
}
