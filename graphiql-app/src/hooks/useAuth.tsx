import { useEffect, useState } from 'react';

import { auth } from '@/utils/fireBaseConfig';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        document.cookie = `userid=${user.uid};path=/`;
      } else {
        document.cookie = '';
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
