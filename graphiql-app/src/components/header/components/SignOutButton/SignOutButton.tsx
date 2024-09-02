import { Button } from '@mui/material';

import { useTranslations } from 'next-intl';

import { logout } from '../../../../utils/auth';

const SignOutButton = () => {
  const translation = useTranslations('signOutBtn');

  return (
    <Button variant='contained' size='small' onClick={logout}>
      {translation('signOutBtn')}
    </Button>
  );
};

export { SignOutButton };
