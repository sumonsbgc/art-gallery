/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export const getLikeArtList = () => useAppSelector((state: RootState) => state.like.likeArts);

export const getTotalLikeArt = () =>
  useAppSelector((state: RootState) => state.like.likeArtsAllData?.total || 0);

export const getLikeArtIds = () =>
  useAppSelector((state: RootState) => state.like.likeArts.map((item) => item?.item_id));
