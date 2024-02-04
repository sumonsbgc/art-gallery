import { Suspense } from 'react';

// components
import Navbar from './Navbar';
import Footer from '@/components/layout/Footer';
import PageLoader from '@/components/common/PageLoader';

const ArtistLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Navbar />
      <main className="mt-[47px] mb-[130px]">{children}</main>
      <Footer />
    </Suspense>
  );
};

export default ArtistLayoutWrapper;
