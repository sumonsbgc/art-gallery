import React from 'react';
import { ArtCardSkeleton } from '..';

const TopRatedArtSkeletonList = ({
  isLoading,
  items = 8
}: {
  isLoading: boolean;
  items?: number;
}) => {
  return isLoading && Array.from(Array(items).keys()).map((i) => <ArtCardSkeleton key={i} />);
};

export default TopRatedArtSkeletonList;
