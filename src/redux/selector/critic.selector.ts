/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getMyReviews = () => useAppSelector((state: RootState) => state.critic?.myReviews);
