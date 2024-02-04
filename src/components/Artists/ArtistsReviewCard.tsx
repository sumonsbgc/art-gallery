import React from 'react';
import { Icon } from '../ui';

type ReviewsProp = {
  loading: boolean;
  icon: string;
  title: string;
  count: string;
  color: string;
  className: string;
};

const ArtistsReviewCard = ({ loading, icon, title, count, color, className }: ReviewsProp) => {
  return (
    <div
      className={`w-[167px] h-[92px] md:w-[292px] md:h-[150px] shadow-lg px-4 md:px-6 py-3 md:py-12 ${className}`}
    >
      <div className="w-full flex">
        <div className="w-8/12 h-[75px] gap-4">
          <Icon name={icon} size="24" color={color} className="block md:hidden" />
          <Icon name={icon} size="48" color={color} className="hidden md:block" />
          <span className="text-black text-[14px] md:text-[18px] font-[400]">{title}</span>
        </div>
        <div className="w-4/12 h-[75px] items-center">
          <span className="text-black text-[24px] font-[600] md:text-[36px] md:font-[500]">
            {loading ? <span className="loading loading-infinity loading-lg"></span> : count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArtistsReviewCard;
