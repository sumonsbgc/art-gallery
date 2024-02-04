/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// ant design
import { Button } from 'antd';

// components
import Layout from '@/components/layout';
import ArtistsHeroSection from '@/components/Sections/Home/ArtistsHeroSection';
import Wrapper from '@/components/layout/Wrapper';
import ArtistsItem from '@/components/Artists/ArtistsItem';
import { NoDataFound, Title } from '@/components/common';
import BASlider from '@/components/common/Form/BASlider';
import Select from '@/components/checkout/Select';
import ArtistFilterModal from '@/components/common/Modals/ArtistsFilterModal';
import ArtCardSkeletonList from '@/components/common/Skeleton/ArtCardSkeletonList';

// redux
import {
  useGetArtistsListQuery,
  useLazyGetArtistsListQuery
} from '@/redux/features/artist/artistApi';
import { Country, UserData } from '@/redux/features/auth/auth.types';
import { useGetCountryListQuery } from '@/redux/features/auth/authApi';

// utils
import { moneyFormat } from '@/utils';

// types
import { ArtistsParamsType } from '@/types/meta.type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const sortByList = [
  // {
  //   label: 'Most Views',
  //   value: 'most_fav'
  // },
  {
    label: 'Trending Artists',
    value: 'trending_artist'
  },
  // {
  //   label: 'Average Art Prices',
  //   value: 'average_art_prices'
  // },
  {
    label: 'Top Artists of the Week',
    value: 'top_Artist_weekly'
  },
  {
    label: 'Most Highly Reviewed',
    value: 'most_highly_reviewed'
  },
  {
    label: 'Highly Rated',
    value: 'highly_rated'
  },
  {
    label: 'Hot Newcomers',
    value: 'hot_newcomers'
  }
];

const AllArtistsPage = () => {
  const param = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [artists, setArtists] = useState<any>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [totalArtistsCount, setTotalArtistsCount] = useState<number>(0);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<ArtistsParamsType>({
    country_id: '',
    avg_art_price_min: '',
    avg_art_price_max: '',
    sort_by: ''
  });

  const { data: countryList } = useGetCountryListQuery({});
  const [getArtistsList] = useLazyGetArtistsListQuery();

  const {
    data: artistList,
    isLoading,
    isSuccess,
    isError
  } = useGetArtistsListQuery(
    { ...params },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'country_id') {
      console.log(e.target.name, e.target.value, 'country_id');
      setParams((prevParams) => ({ ...prevParams, ['country_id']: e.target.value }));
    } else {
      console.log(e.target.name, e.target.value, 'sort_by');
      setParams((prevParams) => ({ ...prevParams, ['sort_by']: e.target.value }));
    }
  };

  const onPriceHandler = (value: number[]) => {
    setParams((prevParams) => ({
      ...prevParams,
      ['avg_art_price_min']: String(value[0]),
      ['avg_art_price_max']: String(value[1])
    }));
  };

  const handleLoadMore = async () => {
    const res = await getArtistsList({ page: page + 1 });
    if (res?.data?.status === 'success') {
      const _artists: any = res?.data?.data?.data;
      console.log(_artists, 'ARTISTS');
      setArtists((prevArtists: any) => [...prevArtists, ..._artists]);
      if (res?.data?.data?.next_page_url) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useLayoutEffect(() => {
    if (isSuccess && !isLoading) {
      console.log(artistList?.data?.data, 'ARTISTS');
      setArtists(artistList?.data?.data);
      setTotalArtistsCount(artistList?.data?.total);
    }
  }, [isSuccess, isError, artistList]);

  const handleFilter = (info: boolean) => {
    setOpenFilter(info);
  };

  const onResetFilter = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setParams({
      country_id: '',
      avg_art_price_min: '',
      avg_art_price_max: '',
      sort_by: ''
    } as ArtistsParamsType);
  };

  useEffect(() => {
    console.log(param);
    const countryId = param.get('country_id') || '';
    const minPrice = param.get('avg_min_price') || '';
    const maxPrice = param.get('avg_max_price') || '';
    const sort_by = param.get('sort_by') || '';

    if (countryId && params.country_id !== countryId) {
      setParams((prevParams) => ({ ...prevParams, ['country_id']: countryId }));
    }

    if (sort_by && params.sort_by !== sort_by) {
      setParams((prevParams) => ({ ...prevParams, ['sort_by']: sort_by }));
    }

    if (
      minPrice &&
      maxPrice &&
      (params.avg_art_price_min !== minPrice || params.avg_art_price_max !== maxPrice)
    ) {
      setParams((prevParams) => ({
        ...prevParams,
        ['avg_art_price_min']: minPrice,
        ['avg_art_price_max']: maxPrice
      }));
    }
  }, [param]);

  useEffect(() => {
    const country_id = `country_id=${params?.country_id}`;
    const minPrice = `avg_min_price=${params?.avg_art_price_min}`;
    const maxPrice = `avg_max_price=${params?.avg_art_price_max}`;
    const sort_by = `sort_by=${params?.sort_by}`;

    const queryString = [
      params?.country_id && country_id,
      params?.avg_art_price_min && minPrice,
      params?.avg_art_price_max && maxPrice,
      params?.sort_by && sort_by
    ]
      .filter(Boolean)
      .join('&');

    router.push(pathname + '?' + queryString, { scroll: false });
  }, [params]);

  return (
    <Layout>
      <ArtistsHeroSection />
      <div className="w-full mt-8 md:mt-12 mb-24">
        <Wrapper>
          <section className="flex justify-between mb-6 items-center">
            <div>
              <Title content="All Artists" className="capitalize text-base" />
            </div>
            <div className="gap-3 hidden md:flex">
              <div>
                <Select
                  name="country_id"
                  label="Filter by Country"
                  onChange={onFilterChange}
                  value={params.country_id}
                  option={countryList?.data?.map((country: Country) => ({
                    label: country?.country_name,
                    value: String(country?.country_id)
                  }))}
                  className="!px-4 !py-1 bg-white focus:outline-none text-sm !w-[160px] !h-[32px] !min-h-0"
                  wrapperClass="!min-h-0"
                />
              </div>
              <div className="relative">
                <input
                  placeholder="Price"
                  onMouseDown={() => setShowSlider(!showSlider)}
                  readOnly
                  value={`${moneyFormat(
                    Number(params?.avg_art_price_min),
                    true,
                    'USD',
                    0
                  )} - ${moneyFormat(Number(params?.avg_art_price_max), true, 'USD', 0)}`}
                  className="!px-4 !py-1 bg-white text-sm !w-[150px] !h-[32px] !min-h-0 border border-stone-500 border-opacity-30 bg-transparent text-stone-500 font-normal rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
                {showSlider && (
                  <div className="flex flex-col rounded-md bg-white gap-4 py-5 px-8 justify-start items-center shadow-lg absolute right-0 top-10 z-50 w-[390px] h-[120px]">
                    <BASlider
                      dots={true}
                      min={0}
                      max={10000}
                      onChange={onPriceHandler}
                      value={[Number(params?.avg_art_price_min), Number(params?.avg_art_price_max)]}
                      range={true}
                      step={2000}
                      showMarks
                    />
                    <Button
                      className="bg-orange absolute bottom-3 right-3 text-white rounded"
                      onClick={() => setShowSlider(false)}
                    >
                      Set
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Select
                  onChange={onFilterChange}
                  label="Sort by"
                  name="sort_by"
                  value={params?.sort_by}
                  option={sortByList?.map((sort: any) => ({
                    label: sort?.label,
                    value: sort?.value
                  }))}
                  className="px-4 !py-1 bg-white focus:outline-none text-sm !w-[210px] !h-[32px] !min-h-0"
                  wrapperClass="!min-h-0"
                />
              </div>
              <div className="flex items-center">
                <button onClick={onResetFilter} className="text-sm font-normal text-gray">
                  Reset All
                </button>
              </div>
            </div>

            <div className="md:hidden flex">
              <div className="w-full flex justify-end">
                <button
                  className="bg-black text-white px-6 py-1"
                  onClick={() => handleFilter(true)}
                >
                  Filter
                </button>
              </div>
            </div>
          </section>

          {<ArtCardSkeletonList isLoading={isLoading} />}

          {Array.isArray(artists) && artists?.length > 0 ? (
            <InfiniteScroll
              dataLength={artists?.length}
              next={handleLoadMore}
              hasMore={artists?.length < totalArtistsCount}
              loader={<ArtCardSkeletonList isLoading={true} items={4} />}
            >
              <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {artists?.map((artist: UserData) => (
                  <div key={artist?.id}>
                    <ArtistsItem
                      authorImg={artist?.image_path}
                      authorName={artist?.name}
                      artistId={artist?.id}
                      likeCount={artist?.total_follower}
                      country={artist?.country?.country_name}
                      flagUrl={artist?.country?.country_badges}
                      artistAbout={artist?.about}
                      totalReviews={artist?.total_review || 0}
                      totalFavorite={
                        artist?.total_favorite === null ? 0 : artist?.total_favorite || 0
                      }
                      rating={artist?.average_rating || 0}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            !isLoading &&
            artists?.length === 0 && (
              <NoDataFound content="Your filtering criteria is not able to find any Artist" />
            )
          )}
        </Wrapper>
      </div>
      <ArtistFilterModal
        open={openFilter}
        onClose={() => handleFilter(false)}
        params={params}
        countryList={countryList}
        sortByList={sortByList}
        onPriceHandler={onPriceHandler}
        onResetFilter={onResetFilter}
        onFilterChange={onFilterChange}
      />
    </Layout>
  );
};

export default AllArtistsPage;
