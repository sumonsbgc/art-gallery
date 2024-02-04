'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

// components
import { AuthModal, PageLoader } from '@/components/common';

// data
import { accessibleRoutes } from '@/data/routes';

// redux
import { useAppDispatch } from '@/redux/hooks';
import { checkIsAuthModalOpen, getUserInfo } from '@/redux/selector/auth.selector';
import { useLazyGetProfileQuery } from '@/redux/features/auth/authApi';
import { closeAuthModal } from '@/redux/features/auth/authSlice';

type AuthWrapperProps = {
  children: ReactNode;
  type?: string;
};

function AuthWrapper({ children }: AuthWrapperProps) {
  const [getProfile] = useLazyGetProfileQuery();
  const router: any = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const userInfo = getUserInfo();
  const isAuthModalOpen = checkIsAuthModalOpen();

  const [noAccess, setNoAccess] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    dispatch(closeAuthModal());
  };

  useEffect(() => {
    if (userInfo?.user_type === '') {
      setLoading(true);
      getProfile({});
      setLoading(false);
    }
  }, [getProfile, userInfo?.user_type]);

  useEffect(() => {
    setLoading(true);
    const isCritic = userInfo?.is_critic === 2 || false;
    const isArtist = userInfo?.is_artist === 2 || false;
    const accessToken = Cookies.get('accessToken');
    const type = accessToken ? userInfo?.user_type : 'guest';

    if (type) {
      const isAuth = accessibleRoutes(router, pathname, type, isArtist, isCritic);

      if (!isAuth) {
        router.replace('/');
      } else {
        setNoAccess(false);
      }
    }

    setLoading(false);
  }, [pathname, router, userInfo?.user_type, userInfo?.is_artist, userInfo?.is_critic]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {noAccess ? null : (
        <>
          {children}

          <AuthModal open={isAuthModalOpen} onClose={handleClose} />
        </>
      )}
    </>
  );
}

export default AuthWrapper;
