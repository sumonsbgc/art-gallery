'use client';
// import Image from 'next/image';
import { Title } from '../common';
import { moneyFormat } from '@/utils';
import Rating from '../common/Rating';
import Img from '../common/Img';

type TopRatedProp = {
  imgUrl: string;
  title: string;
  price: number;
  rating: number;
  onRedirectClick: () => void;
};

const RecentItem = ({ imgUrl, title, price, rating, onRedirectClick }: TopRatedProp) => {
  return (
    <div className="toprated-item w-[170px] sm:w-[185px] justify-center relative flex-shrink-0">
      <div
        className="w-full h-[220px] bg-gray3 flex justify-center items-center p-3 sm:px-7 cursor-pointer relative"
        onClick={onRedirectClick}
      >
        <Img src={imgUrl} alt={title} layout />
      </div>
      <div className="gallery__content">
        <div className="flex flex-col items-center mt-4 text-center gap-2">
          <div className="flex">
            <Rating rating={rating || 0} color="#F6D008" readOnly />
          </div>
          <Title content={title} />
          <span className="text-gray4 text-lg font-medium">{moneyFormat(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default RecentItem;
