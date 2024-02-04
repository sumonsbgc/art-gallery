/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

// redux
import { useGetArtistsQuery } from '@/redux/features/artist/artistApi';

// components
import GalleryItem from '@/components/Artists/GalleryItem';
import { SectionTitle, Text, FeaturedArtSkeletonList } from '@/components/common';
import { Icon } from '@/components/ui';
import Wrapper from '@/components/layout/Wrapper';

// styles
import 'swiper/css';

const ArtistSection = () => {
  const [artists, setArtists] = useState([]);
  const {
    data: artistList,
    isLoading,
    isSuccess,
    isError
  } = useGetArtistsQuery(
    {},
    { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    if (artistList?.data?.length > 0 && Array.isArray(artistList?.data)) {
      setArtists(artistList?.data);
    }
  }, [isSuccess, isError]);

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
      <div className="artists-gallery pl-10">
        <div className="gallery-wrapper md:gap-10 gap-8">
          <FeaturedArtSkeletonList isLoading={isLoading} />
          {!isLoading && (
            <Swiper
              className="w-full"
              direction="horizontal"
              spaceBetween={42}
              slidesPerView="auto"
              grabCursor={true}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true
              }}
              modules={[Mousewheel]}
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 32
                },
                540: {
                  slidesPerView: 2,
                  spaceBetween: 32
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 32
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 32
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 32
                },
                1366: {
                  slidesPerView: 5,
                  spaceBetween: 42
                },
                1466: {
                  slidesPerView: 6,
                  spaceBetween: 42
                }
              }}
            >
              {Array.isArray(artists) &&
                artists?.length > 0 &&
                artists?.map((artist: any) => (
                  <SwiperSlide key={artist?.id}>
                    <GalleryItem
                      authorImg={artist?.image_path}
                      authorName={artist?.name}
                      authorId={artist?.id}
                      likeCount={artist?.total_follower}
                      country={artist?.country?.country_name}
                      flagUrl={artist?.country?.country_badges}
                      // onRedirectClick={() => router.push(`/artists/${artist?.id}/${artist?.name}`)}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-11">
        <Link className="text-white flex items-center gap-2" href={'/artists'}>
          <span>ALL ARTISTS</span> <Icon name="arrow-right-long" color="white" />
        </Link>
      </div>
    </section>
  );
};

export default ArtistSection;
