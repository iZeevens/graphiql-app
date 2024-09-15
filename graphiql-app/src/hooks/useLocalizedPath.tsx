import { useCurrentLanguage } from '@/hooks/useCurrentLanguage';

export function useLocalizedPath(path: string): string {
  const locale = useCurrentLanguage();
  return `/${locale}${path}`;
}
