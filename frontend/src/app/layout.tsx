import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/Providers';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'CineList – Your Movie Watchlist',
    template: '%s | CineList',
  },
  description: 'Track movies you want to watch, have watched, and everything in between.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
