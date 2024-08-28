import { Button } from '@mui/material';

import { logout } from '../../../../utils/auth';

const SignOutButton = () => {
  return (
    <Button variant='contained' size='small' onClick={logout}>
      Sign Out
    </Button>
  );
};

export { SignOutButton };
