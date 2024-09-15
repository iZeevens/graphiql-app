import styles from '@/components/header/components/Logo/Logo.module.scss';

export const Logo = () => {
  return (
    <svg
      className={styles.logo}
      width='29'
      height='10'
      viewBox='0 0 29 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17.9999 0L18 2.5H14.9999V4H17.9999L18 6.5H14.9999V10H11.9999V0H17.9999ZM3.23285 0V2.5L7.02678 8L3.23285 6.90515V10H0.38623V0H3.23285ZM9.8734 0V10H7.02678V0H9.8734Z M19.9999 0V2.5L25 7.14284H19.9999V10H28.5V7.14284L24.1497 2.85714H28.5V0H19.9999Z' />
    </svg>
  );
};
