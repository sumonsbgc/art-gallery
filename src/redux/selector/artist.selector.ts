/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getAllOrders = () => useAppSelector((state: RootState) => state.artist.allOrdersData);

export const getAnalytics = () => useAppSelector((state: RootState) => state.artist.analytics);

export const getSingleOrderDetails = () =>
  useAppSelector((state: RootState) => state.artist.singleOrder);

export const getDisburseAnalyticsData = () =>
  useAppSelector((state: RootState) => state.artist.disburseAnalytics);

export const getAllWithdraws = () => useAppSelector((state: RootState) => state.artist.withdraws);

export const getSingleReviewDetails = () =>
  useAppSelector((state: RootState) => state.artist.singleReviewDetails);
