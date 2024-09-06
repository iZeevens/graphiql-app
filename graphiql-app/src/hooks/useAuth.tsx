import { useEffect, useState } from 'react';

import { auth } from '@/utils/fireBaseConfig';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
      if (user) {
        document.cookie = `userid=${user.uid};path=/`;
      } else {
        document.cookie =
          'userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    });

    return () => unsubscribe();
  }, [user]);

  return { user, loading };
}
