import React from 'react';
import { ArtCardSkeleton } from '..';

const ArtCardSkeletonList = ({ isLoading, items = 8 }: { isLoading: boolean; items?: number }) => {
  return (
    isLoading && (
      <div className="w-full mt-8 lg:mt-6 mb-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {Array.from(Array(items).keys()).map((i) => (
            <ArtCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  );
};

export default ArtCardSkeletonList;
