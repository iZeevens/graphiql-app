import Box from '@mui/material/Box';

import Link from 'next/link';

import styles from '@/components/welcome/components/greeting/GreetingLink.module.scss';

interface GreetingLinkProps {
  text: string;
  path: string;
  background: string;
  isDisabled?: boolean;
}

const GreetingLink = ({
  text,
  path,
  background,
  isDisabled,
}: GreetingLinkProps) => {
  return (
    <div className={`${styles.link} ${isDisabled ? styles.link_disabled : ''}`}>
      <Link
        href={path}
        className={styles.link__link}
        style={{ background: background }}
      >
        {text}
      </Link>
      <Box className={styles.link__decor} />
    </div>
  );
};

export default GreetingLink;
