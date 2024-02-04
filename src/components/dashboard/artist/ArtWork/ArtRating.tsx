'use client';

import { Dispatch, SetStateAction } from 'react';

// and design
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

// components
import { Rating, Title, Img } from '@/components/common';

// types
import { Reviews } from '@/redux/features/review/reviewRating.types';

type ArtRatingType = {
  reviews: Reviews[];
  totalReview: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
};

const ArtRating = ({ reviews, totalReview, page, setPage, limit }: ArtRatingType) => {
  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  return (
    <div className="w-full">
      {Array.isArray(reviews) &&
        reviews?.length > 0 &&
        reviews?.map((review: any) => (
          <div
            className="bg-white gap-4 px-7 py-5 rounded-md border-black/10 border mb-4"
            key={review?.rating_id}
          >
            <div className="bg-white flex items-start gap-4">
              <Img
                src={review?.userDetail?.image_path || '/assets/img/artist.png'}
                alt={review?.userDetail?.name}
                width={55}
                height={55}
                className="rounded-full flex-shrink-0 w-[55px] h-[55px]"
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <Title
                      content={review?.userDetail?.name}
                      className="text-base font-medium uppercase text-black"
                    />
                    <span
                      className={`text-xs font-medium text-white py-[2px] px-[10px] rounded-xl items-center capitalize ${
                        review?.type === 'customer' || review?.type?.length === 0
                          ? 'hidden'
                          : 'flex'
                      } ${review?.userDetail?.user_type === 'critic' ? 'bg-orange' : 'bg-black'}`}
                    >
                      {review?.userDetail?.user_type}
                    </span>
                    {/* <span className="bg-black text-xs font-medium text-white py-[2px] px-[10px] rounded-xl flex items-center capitalize">
                      {review?.userDetail?.user_type}
                    </span> */}
                  </div>
                  <Rating rating={Number(review?.rating)} color="#FFC600" size={16} readOnly />
                </div>
                <span className="text-[#4f4f4f] text-sm font-normal capitalize">
                  {review?.userDetail?.country?.country_name}
                </span>
                <p className="mt-4">{review?.rating_comment}</p>
              </div>
            </div>
          </div>
        ))}

      {reviews?.length === 0 && (
        <div className="bg-white gap-4 px-7 py-5 rounded-md border-black/10 border mb-4">
          <p className="text-center text-base font-normal uppercase text-black">No Reviews yet</p>
        </div>
      )}

      <div className="flex w-full justify-center">
        <Pagination
          defaultCurrent={page}
          onChange={onChange}
          total={totalReview}
          pageSize={limit}
        />
      </div>
    </div>
  );
};

export default ArtRating;
