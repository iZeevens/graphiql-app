import { usePathname } from 'next/navigation';

export const useCurrentLanguage = () => {
  const pathname = usePathname();
  return pathname?.split('/')[1] || 'en';
};
