import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
