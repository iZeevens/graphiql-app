'use client';

import { SignUpForm } from '@/components/SignUpForm/SignUpForm';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  console.log(user, loading);

  return <SignUpForm />;
}
