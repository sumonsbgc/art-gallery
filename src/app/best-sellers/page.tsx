'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import Layout from '@/components/layout';
import { NoDataFound } from '@/components/common';
import Arts from '@/components/Sections/NewArrivals/Arts';
// import SearchFilter from '@/components/Sections/NewArrivals/SearchFilter';
import Wrapper from '@/components/layout/Wrapper';

// redux
import { useLazyGetBestSellerArtsQuery } from '@/redux/features/arts/artsApi';

// types
import { ArtItem } from '@/types/art';
import BestSellerArtsFilter from '@/components/common/Filter/BestSellerArtsFilter';
import ArtCardSkeletonList from '@/components/common/Skeleton/ArtCardSkeletonList';
import { getTotalItems } from '@/utils';

function BestSellers() {
  const [getArts] = useLazyGetBestSellerArtsQuery();
  const [arts, setArts] = useState<ArtItem[]>([] as ArtItem[]);
  const [totalArtsCount, setTotalArtsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [artParams, setArtParams] = useState({});

  const handleLoadMore = async () => {
    const res = await getArts({ page: page + 1, ...artParams });

    if (res?.data?.status === 'success') {
      const _arts = res?.data?.data?.data;
      setArts((prevArts) => [...prevArts, ..._arts]);

      if (res?.data?.data?.next_page_url) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <Layout headerBottomBorder={true}>
      <div className="w-full">
        <Wrapper maxWidth="1550px">
          <div className="w-full flex sm:flex-col items-center justify-between text-center mt-4">
            <h2 className="text-2xl font-[600] text-black">Best Sellers</h2>
            <p className="text-[14px] font-[400] text-black">{getTotalItems(totalArtsCount)}</p>
          </div>

          <div className="w-full 2xl:flex 2xl:justify-between 2xl:gap-8">
            <div className="2xl:w-[275px]">
              <BestSellerArtsFilter
                setArts={setArts}
                setIsLoading={setIsLoading}
                setTotalArtsCount={setTotalArtsCount}
                setArtParams={setArtParams}
                resetPage={() => setPage(1)}
              />
            </div>
            <div className="w-full 2xl:flex-1">
              {<ArtCardSkeletonList isLoading={isLoading} />}
              {!isLoading && Array.isArray(arts) && arts?.length === 0 && (
                <div className="py-10">
                  <NoDataFound />
                </div>
              )}

              {!isLoading && Array.isArray(arts) && arts?.length > 0 && (
                <InfiniteScroll
                  dataLength={arts?.length}
                  next={handleLoadMore}
                  hasMore={arts?.length < totalArtsCount}
                  loader={<ArtCardSkeletonList isLoading={true} items={4} />}
                >
                  <Arts arts={arts as []} />
                </InfiniteScroll>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
}

export default BestSellers;
