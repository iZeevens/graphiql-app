import Button from '@mui/material/Button';

import { useAuthActions } from '@/hooks/useAuthActions';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const AuthButtons = () => {
  const actions = useAuthActions();
  const t = useTranslations('header');

  return (
    <>
      {actions.map(action =>
        action.path ? (
          <Link key={action.name} href={action.path}>
            <Button>{t(`${action.name}Btn`)}</Button>
          </Link>
        ) : (
          <Button key={action.name} onClick={action.onClick}>
            {t(`${action.name}Btn`)}
          </Button>
        ),
      )}
    </>
  );
};
