/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getOrderList = () => useAppSelector((state: RootState) => state.payment.orderList);
export const getTotalOrderCount = () =>
  useAppSelector((state: RootState) => state.payment.orderListAllData?.total || 0);
