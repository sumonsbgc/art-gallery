/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getFollowerList = () =>
  useAppSelector((state: RootState) => state.followers.followers);
