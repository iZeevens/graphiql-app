'use client';

import { useMemo } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/auth';

interface IActions {
  name: string;
  authOnly: boolean;
  path?: string;
  onClick?: () => Promise<void> | void;
}

const actions: IActions[] = [
  { name: 'signIn', path: '/signin', authOnly: false },
  { name: 'signUp', path: '/signup', authOnly: false },
  { name: 'signOut', onClick: logout, authOnly: true },
];

export const useAuthActions = (): IActions[] => {
  const { user } = useAuth();

  const filteredActions = useMemo(() => {
    return actions.filter(action =>
      user ? action.authOnly : !action.authOnly,
    );
  }, [user]);

  return filteredActions;
};
