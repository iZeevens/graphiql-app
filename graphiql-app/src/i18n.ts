import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  const messages =
    locale === 'en'
      ? (await import('../messages/en.json')).default
      : (await import('../messages/ru.json')).default;

  return {
    messages,
  };
});
