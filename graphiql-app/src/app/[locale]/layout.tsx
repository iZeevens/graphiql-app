import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
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
        <body className='flex flex-col min-h-screen'>
          <AppRouterCacheProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <main className='flex-grow'>{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </AppRouterCacheProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
