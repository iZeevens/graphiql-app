'use client';

import Container from '@mui/material/Container';

import Greeting from '@/components/greeting/Greeting';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  return loading ? <Container>Loading...</Container> : <Greeting user={user} />;
}
