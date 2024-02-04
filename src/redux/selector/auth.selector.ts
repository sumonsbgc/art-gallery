/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getUserInfo = () => useAppSelector((state: RootState) => state.auth.user);

export const checkAuthUser = () =>
  useAppSelector((state: RootState) => String(state.auth.accessToken)?.length > 0);

export const checkIsAuthModalOpen = () =>
  useAppSelector((state: RootState) => state.auth.isAuthModalOpen);
