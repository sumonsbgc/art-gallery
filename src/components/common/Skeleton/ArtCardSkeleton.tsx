'use client';

import { Skeleton } from 'antd';

const ArtCardSkeleton = () => {
  return (
    <div className="w-[310px] sm:w-full !h-[330px] mx-auto flex-shrink-0 cursor-pointer">
      <Skeleton.Image className="!w-full !h-[250px] mb-2" active={true} />
      <Skeleton
        active
        paragraph={{
          width: '90%'
        }}
        title={{ className: 'w-full' }}
      />
    </div>
  );
};

export default ArtCardSkeleton;
