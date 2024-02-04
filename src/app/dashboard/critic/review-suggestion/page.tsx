'use client';

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import ReviewArts from '@/components/Sections/NewArrivals/ReviewArts';
import { ArtCardSkeletonList, Img } from '@/components/common';

// redux
import { useGetToReviewsQuery, useLazyGetToReviewsQuery } from '@/redux/features/critic/criticApi';

type ArtsType = {
  regular_price: number;
  item_slug: string;
  image_path: string;
  rating: number;
  status: string;
  isFav: boolean;
};

const ReviewSuggestionPage = () => {
  const [arts, setArts] = useState<ArtsType[]>([] as ArtsType[]);
  // const [noData, setNodata] = useState<boolean>(false);
  const [totalArtsCount, setTotalArtsCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const { isLoading, data } = useGetToReviewsQuery({ result: 10 });
  const [getToReviews] = useLazyGetToReviewsQuery();

  useEffect(() => {
    if (!isLoading && data?.data?.data.length > 0) {
      setArts(data?.data?.data);
      setTotalArtsCount?.(data?.data?.total || 0);
    }
  }, [isLoading, data]);

  const handleLoadMore = async () => {
    const res = await getToReviews({ page: page + 1, result: 10 });

    if (res?.data?.status === 'success') {
      const _arts = res?.data?.data?.data;
      setArts((prevArts) => [...prevArts, ..._arts]);

      if (res?.data?.data?.next_page_url) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <div className="w-full">
      <Wrapper>
        <section className="w-full h-[38px] px-4 py-[9px] bg-orange bg-opacity-10 justify-start items-center gap-2.5 flex">
          <Icon name="info" size="16" color="orange" />
          <p className="grow shrink basis-0 text-black text-sm font-normal">
            Kindly Review & Rate the Art and help our Artists to grow.
          </p>
          <Icon name="close" size="20" color="gray2" />
        </section>
        {<ArtCardSkeletonList isLoading={isLoading} />}
      </Wrapper>

      {arts?.length < 1 && !isLoading && (
        <div className="flex justify-center w-full mt-16">
          <Img
            src="/assets/img/critic/not-found.png"
            alt="No Data Found For Review"
            width={383}
            height={335}
          />
        </div>
      )}
      <Wrapper>
        {!isLoading && Array.isArray(arts) && arts?.length > 0 && (
          <InfiniteScroll
            dataLength={arts?.length}
            next={handleLoadMore}
            hasMore={arts?.length < totalArtsCount}
            loader={<ArtCardSkeletonList isLoading={true} items={4} />}
          >
            <ReviewArts arts={arts as []} />
          </InfiniteScroll>
        )}
      </Wrapper>
    </div>
  );
};

export default ReviewSuggestionPage;
