'use client';

import { Skeleton } from 'antd';

const PriceShortChartSkeleton = () => {
  return (
    <div className="w-[310px] sm:w-full mx-auto flex-shrink-0 cursor-pointer">
      {/* <Skeleton.Image className="!w-full !h-[250px] mb-2" active={true} /> */}
      <Skeleton active title={{ className: 'w-full h-full' }} />
    </div>
  );
};

export default PriceShortChartSkeleton;
