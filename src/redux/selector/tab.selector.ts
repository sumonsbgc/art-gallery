/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getActiveTab = () => useAppSelector((state: RootState) => state.tab.activeTab);
