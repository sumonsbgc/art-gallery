/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar, Navigation } from 'swiper/modules';

// redux
import {
  useGetArtistsListQuery,
  useLazyGetArtistsListQuery
} from '@/redux/features/artist/artistApi';

// components
import GalleryItemNew from '@/components/Artists/GalleryItemNew';
import { SectionTitle, Text, FeaturedArtSkeletonList } from '@/components/common';
// import { Icon } from '@/components/ui';
import Wrapper from '@/components/layout/Wrapper';

// styles
import 'swiper/css';

const sortByList = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Trending Artists',
    value: 'trending_artist'
  },
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

const ArtistSectionNew = () => {
  const [artists, setArtists] = useState([]);
  const [href, setHref] = useState<string>();

  const [params, setParams] = useState({
    sort_by: 'all'
  });

  const {
    data: artistList,
    isLoading,
    isSuccess,
    isError
  } = useGetArtistsListQuery(
    {},
    { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true }
  );
  const [getArtistsList, { isFetching }] = useLazyGetArtistsListQuery();

  useEffect(() => {
    if (artistList?.data?.data?.length > 0 && Array.isArray(artistList?.data?.data)) {
      setArtists(artistList?.data?.data);
    }
  }, [isSuccess, isError]);

  const handleLoadFilter = async (value: string) => {
    const res = await getArtistsList({ sort_by: value });
    if (res?.data?.status === 'success') {
      const _artists: any = res?.data?.data?.data;
      setArtists(_artists);
    }
  };

  const onFilterChange = (value: string) => {
    setParams({ ...params, sort_by: value });
    if (value == 'all') {
      setHref('');
      if (artistList?.data?.length > 0 && Array.isArray(artistList?.data)) {
        setArtists(artistList?.data);
      }
    } else {
      const link = '/artists/?sort_by=' + value;
      setHref(link);
      handleLoadFilter(value);
    }
  };

  return (
    <section className="pt-4">
      <Wrapper>
        <div className="text-center max-w-[660px] mx-auto mb-11 sm:mb-14 px-4">
          <SectionTitle content="Artists" className="mb-4" />
          <Text className="italic">
            An artist is a skilled creator who uses various techniques and mediums to express their
            artistic vision, often showcasing their work in exhibitions or galleries. Art Grade
            gives them a platform to show case their talent across the globe.
          </Text>
        </div>
      </Wrapper>
      <div className="w-full px-5 sm:px-6 md:px-16">
        <div className="w-full flex flex-col md:flex-row gap-4 md:justify-between md:items-center mb-6">
          <div className="w-full md:w-10/12">
            {sortByList.map((item, index) => (
              <button
                key={index}
                className={`h-[42px] px-3 py-3 text-[14px] font-[400] cursor-pointer hidden lg:inline-block ${
                  params.sort_by === item.value ? 'bg-orange text-white' : 'bg-white text-[#828282]'
                } `}
                onClick={() => onFilterChange(item.value)}
              >
                {item.label}
              </button>
            ))}
            <select
              className="sm:w-[360px] w-full h-[42px] px-3 py-3 text-[14px] font-[400] cursor-pointer lg:hidden focus-visible:outline-none border rounded-md"
              onChange={(e) => onFilterChange(e.target.value)}
            >
              {sortByList.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-2/12 flex justify-start md:justify-end">
            <Link
              href={href ? href : '/artists'}
              target="_blank"
              className="w-[88px] h-8 border-2 border-orange backdrop-blur-[8.30px] justify-center items-center flex text-right text-orange text-sm font-normal"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="artists-gallery flex justify-center">
          <div className="gallery-wrapper">
            <FeaturedArtSkeletonList isLoading={isLoading || isFetching} />
            {!isLoading && !isFetching && (
              <Swiper
                className="w-full !py-8"
                direction="horizontal"
                freeMode={true}
                spaceBetween={32}
                slidesPerView="auto"
                grabCursor={true}
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true
                }}
                modules={[Mousewheel, Scrollbar, Navigation]}
                navigation={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 1
                  },
                  360: {
                    slidesPerView: 1,
                    spaceBetween: 2
                  },
                  540: {
                    slidesPerView: 1,
                    spaceBetween: 4
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16
                  },
                  980: {
                    slidesPerView: 3,
                    spaceBetween: 16
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 18
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 18
                  },
                  1366: {
                    slidesPerView: 5,
                    spaceBetween: 24
                  },
                  1466: {
                    slidesPerView: 6,
                    spaceBetween: 32
                  }
                }}
              >
                {Array.isArray(artists) &&
                  artists?.length > 0 &&
                  artists?.map((artist: any) => (
                    <SwiperSlide
                      key={artist?.id}
                      // className="artist-section !w-[342px] !h-[355px] flex items-center"
                    >
                      <GalleryItemNew
                        authorImg={artist?.image_path}
                        authorName={artist?.name}
                        authorId={artist?.id}
                        likeCount={artist?.total_follower}
                        country={artist?.country?.country_name}
                        flagUrl={artist?.country?.country_badges}
                        totalFavorite={
                          artist?.total_favorite === null ? 0 : artist?.total_favorite || 0
                        }
                        // onRedirectClick={() => router.push(`/artists/${artist?.id}/${artist?.name}`)}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center mt-11">
        <Link className="text-black flex items-center gap-2" href={'/artists'}>
          <span>ALL ARTISTS</span> <Icon name="arrow-right-long" color="white" />
        </Link>
      </div> */}
    </section>
  );
};

export default ArtistSectionNew;
