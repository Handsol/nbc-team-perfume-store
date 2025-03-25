import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Navibar from '@/components/layout/Navibar';
import Provider from './provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Navibar />
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
