import React from 'react';
import { ArtCardSkeleton } from '..';

const FeaturedArtSkeletonList = ({
  isLoading,
  items = 5
}: {
  isLoading: boolean;
  items?: number;
}) => {
  return (
    isLoading && (
      <div className="flex md:gap-6 gap-5 scroll-m-0">
        {Array.from(Array(items).keys()).map((i) => (
          <ArtCardSkeleton key={i} />
        ))}
      </div>
    )
  );
};

export default FeaturedArtSkeletonList;
