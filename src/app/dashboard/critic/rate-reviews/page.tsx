/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// ant design
import { DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;
// components
import Wrapper from '@/components/layout/Wrapper';
import { CriticReviewItem } from '@/components/dashboard/critic';
import { Icon } from '@/components/ui';
import { ComponentLoader } from '@/components/common';

// redux
import { useGetMyReviewsQuery } from '@/redux/features/critic/criticApi';
import { getMyReviews } from '@/redux/selector/critic.selector';

// types
import { MyReviewItem } from '@/redux/features/critic/critic.types';

const rateItem = (rating: number) => ({
  value: String(rating),
  label: (
    <div className="flex items-center gap-2 italic">
      {rating}
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: rating }, (_, i) => (
          <Icon key={i} name="star-fill" size="14" color="yellow" />
        ))}
      </div>
    </div>
  )
});

const ManageRateAndReviewsPage = () => {
  const myReviews = getMyReviews();
  const [filterByRateReviewDate, setFilterByRateReviewDate] = useState<[string, string]>(['', '']);
  const [filterByRate, setFilterByRate] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const paramsToString = (params: any) => {
    return Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
  };

  const { refetch, isLoading } = useGetMyReviewsQuery(
    paramsToString({
      page,
      start_date: filterByRateReviewDate[0],
      end_date: filterByRateReviewDate[1],
      rating: filterByRate
    })
  );

  const handleLoadMore = async () => {
    if (myReviews?.next_page_url) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Wrapper>
      <p className="text-black text-2xl font-medium capitalize">Rate & Reviews</p>

      {/* review count and filter */}
      <section className="w-full grid grid-cols-1 md:flex md:justify-between md:items-center my-4">
        <p className="text-gray6 text-[18px] font-medium min-w-[200px] mb-4 md:mb-0">
          Rate & Review Given - {myReviews.total}
        </p>

        <div className="w-full flex items-center justify-between md:justify-end gap-4 sm:gap-[10px]">
          <RangePicker
            onChange={(_, dateString) => setFilterByRateReviewDate(dateString)}
            // placeholder="Filter By Rating & Review Date"
            className="w-[250px] h-[32px] pl-3 px-4 py-1 text-sm text-gray5"
          />
          <Select
            placeholder="Filter By Rating"
            onChange={(value: string) => setFilterByRate(value)}
            options={[rateItem(1), rateItem(2), rateItem(3), rateItem(4), rateItem(5)]}
            className="w-[141px] h-[32px]"
          />
        </div>
      </section>

      {isLoading && myReviews?.data?.length === 0 && <ComponentLoader />}

      <InfiniteScroll
        dataLength={myReviews?.data?.length || 0}
        next={handleLoadMore}
        hasMore={myReviews?.data?.length < myReviews?.total}
        loader={
          <div className="flex justify-center my-4">
            <span className="page-loader" />
          </div>
        }
      >
        {/* review list */}
        {myReviews?.data?.map((review: MyReviewItem) => (
          <CriticReviewItem key={review.review} review={review} />
        ))}
      </InfiniteScroll>
    </Wrapper>
  );
};

export default ManageRateAndReviewsPage;
