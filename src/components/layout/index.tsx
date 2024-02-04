/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Suspense, useEffect } from 'react';
import Cookies from 'js-cookie';
import Footer from './Footer';
import Navbar from './Navbar';
import { randomBytes } from 'crypto';
import PageLoader from '../common/PageLoader';
import { useGetOrderItemsQuery } from '@/redux/features/carts/cartsApi';

type LayoutProps = {
  children: React.ReactNode;
  headerBottomBorder?: boolean;
};

const Layout = ({ children, headerBottomBorder }: LayoutProps) => {
  const { refetch } = useGetOrderItemsQuery({});

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!Cookies.get('USER_SESSION_ID')) {
      Cookies.set(
        'USER_SESSION_ID',
        new Date().getTime().toString() + '.' + randomBytes(24).toString('hex')
      );
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Navbar borderBottom={headerBottomBorder} />
      <main>{children}</main>
      <Footer />
    </Suspense>
  );
};

export default Layout;
