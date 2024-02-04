import { countLike } from '@/utils';
import React from 'react';
import { Icon } from '../ui';

type LikeCountProp = {
  likeCount: number;
  className?: string;
};

const LikeCount = ({ likeCount, className }: LikeCountProp) => {
  return (
    <span
      className={`text-orange text-[12px] xs:text-sm font-medium flex gap-1 items-center ${className}`}
    >
      <Icon name="heart-fill" color="orange" size="18" />
      {countLike(likeCount)}
    </span>
  );
};

export default LikeCount;
