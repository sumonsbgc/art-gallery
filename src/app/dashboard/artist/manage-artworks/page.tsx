'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

// ant design
import { Select as AntSelect } from 'antd';

// components
import ArtistWork from '@/components/Sections/Dashboard/ArtWorks/ArtistWorks';
import { ArtCardSkeletonList, NoDataFound } from '@/components/common';
import { RatingOption } from '@/components/common/Form/RatingOptions';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

// redux
import { getUserInfo } from '@/redux/selector/auth.selector';
import {
  useGetArtsByArtistIdQuery,
  useLazyGetArtsByArtistIdQuery
} from '@/redux/features/arts/artsApi';

type ArtsType = {
  regular_price: number;
  item_slug: string;
  image_path: string;
  rating: number;
  status: string;
  isFav: boolean;
};

const ManageArtworksPage = () => {
  const user = getUserInfo();
  const [getArtsByArtistId] = useLazyGetArtsByArtistIdQuery();
  const [arts, setArts] = useState<ArtsType[]>([] as ArtsType[]);
  const [totalArtWork, setTotalArtWork] = useState<number>(0);
  const [filterByRateReviewDate, setFilterByRateReviewDate] = useState<string>('');
  const [filterByRate, setFilterByRate] = useState<string>('0');
  const [page, setPage] = useState<number>(1);
  const { isLoading, data } = useGetArtsByArtistIdQuery(
    {
      artist_id: Number(user?.id),
      page,
      rate: filterByRate,
      daterange: filterByRateReviewDate
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const handleLoadMore = async () => {
    const params = {
      artist_id: Number(user?.id),
      page: page + 1
    };
    const res = await getArtsByArtistId(params);

    if (res?.data?.status === 'success') {
      const _arts = res?.data?.data?.data;
      setArts((prevArts) => [...prevArts, ..._arts]);

      if (res?.data?.data?.next_page_url) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && data?.data?.data?.length > 0) {
      const { data: _arts, total } = data?.data;
      setArts(_arts);
      setTotalArtWork(total);
    }
  }, [isLoading, data?.data]);

  return (
    <div className="w-full">
      <Wrapper>
        <div className="w-full">
          {/* page title and upload button */}
          <section className="w-full flex justify-content-between mt-4 mb-8">
            <div className="w-full flex justify-start">
              <span className="text-black text-[18px] md:text-[24px] font-[500] !capitalize">
                Manage Artwork
              </span>
            </div>
            <div className="w-full flex justify-end items-center">
              <Link
                href="/dashboard/artist/manage-artworks/create"
                className="max-w-[210px] px-4 sm:px-8 py-3 uppercase font-bold text-sm flex justify-center items-center gap-3 text-white bg-orange"
              >
                <Icon name="upload-small" size="18" color="white" className="-mt-1" /> Upload Art
              </Link>
            </div>
          </section>

          {<ArtCardSkeletonList isLoading={isLoading} />}

          {totalArtWork > 0 ? (
            <section className="w-full flex justify-between items-center my-4 sm:flex-row flex-col">
              <p className="text-gray6 text-[18px] font-medium flex-shrink-0">
                Total Artworks - {totalArtWork}
              </p>
              <div className="flex gap-[10px] sm:flex-row flex-col w-full justify-end">
                <AntSelect
                  placeholder="Filter By Rate & Review Date"
                  onChange={(value) => setFilterByRateReviewDate(value)}
                  options={[
                    { value: '', label: 'All Time' },
                    { value: 'this_week', label: 'This Week' },
                    { value: 'last_week', label: 'Last Week' },
                    { value: 'this_month', label: 'This Month' },
                    { value: 'last_month', label: 'Last Month' },
                    { value: 'this_year', label: 'This Year' },
                    { value: 'last_year', label: 'Last Year' }
                  ]}
                  className="w-full sm:w-[219px] h-[32px]"
                />
                <AntSelect
                  placeholder="Filter By Rating"
                  onChange={(value) => setFilterByRate(value)}
                  options={[
                    RatingOption(0, 'All Rate'),
                    RatingOption(1),
                    RatingOption(2),
                    RatingOption(3),
                    RatingOption(4),
                    RatingOption(5)
                  ]}
                  className="w-full sm:w-[141px] h-[32px]"
                />
              </div>
            </section>
          ) : (
            <NoDataFound content="No Artwork is found" />
          )}
        </div>

        {!isLoading && Array.isArray(arts) && arts?.length > 0 && (
          <InfiniteScroll
            dataLength={arts?.length}
            next={handleLoadMore}
            hasMore={arts?.length < totalArtWork}
            loader={<ArtCardSkeletonList isLoading={true} items={4} />}
          >
            <ArtistWork arts={arts as []} />
          </InfiniteScroll>
        )}
      </Wrapper>
    </div>
  );
};

export default ManageArtworksPage;
