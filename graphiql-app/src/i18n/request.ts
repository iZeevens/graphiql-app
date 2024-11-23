import { routing } from '@/i18n/routing';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as 'en' | 'ru')) notFound();

  const messages =
    locale === 'en'
      ? (await import('../../messages/en.json')).default
      : (await import('../../messages/ru.json')).default;

  return {
    messages,
  };
});
