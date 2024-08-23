import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Header from '@/components/header/Header';
import { theme } from '@/theme';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import './globals.css';

export const metadata: Metadata = {
  title: 'GraphiQL App',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <AppRouterCacheProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
            </NextIntlClientProvider>
          </AppRouterCacheProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
