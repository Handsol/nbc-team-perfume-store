import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'OROT - 오롯이 당신만의 향',
  description: '오롯이 : 모자람 없이 온전하게, 오롯이 당신의 향을 누리도록.'
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
        <Navbar />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
