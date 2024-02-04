/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getAllReviews = () =>
  useAppSelector((state: RootState) => state.reviewRating.reviewsData);

export const getReviewsByCriticId = () =>
  useAppSelector((state: RootState) => state.reviewRating.reviewsData);
