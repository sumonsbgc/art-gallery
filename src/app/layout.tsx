import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { register } from 'swiper/element/bundle';

import './globals.css';

// redux
import { ReduxProvider } from '@/redux/provider';

// components
import AuthWrapper from '@/components/layout/AuthWrapper';

const jostFont = Jost({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ValArt',
  description: 'A project by SpaceCats'
};

register();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jostFont.className}>
        <ReduxProvider>
          <AuthWrapper>{children}</AuthWrapper>
          <div id="app_portal"></div>
        </ReduxProvider>
      </body>
    </html>
  );
}
