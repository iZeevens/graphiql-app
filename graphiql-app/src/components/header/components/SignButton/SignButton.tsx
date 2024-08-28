import { Button } from '@mui/material';

import Link from 'next/link';

import { useLocalizedPath } from '../../../../hooks/useLocalizedPath';

interface IProps {
  buttonName: string;
  path: string;
}

const SignButton = ({ buttonName, path }: IProps) => {
  return (
    <Link href={useLocalizedPath(path)}>
      <Button variant='contained' size='small'>
        {buttonName}
      </Button>
    </Link>
  );
};

export { SignButton };
