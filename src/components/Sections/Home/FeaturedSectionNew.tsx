/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar, Navigation } from 'swiper/modules';
import Swal from 'sweetalert2';

// components
import { FeaturedArtSkeletonList, Img, SectionTitle, Text } from '@/components/common';
import { Icon } from '@/components/ui';
import FeatureItem from '@/components/Features/FeatureItem';

// styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// redux
import { useGetFeaturedArtsQuery } from '@/redux/features/arts/artsApi';
import {
  useAddLikeMutation,
  useGetLikesQuery,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { getLikeArtIds } from '@/redux/selector/like.selector';
import { useAppDispatch } from '@/redux/hooks';
import { openAuthModal } from '@/redux/features/auth/authSlice';
import { checkAuthUser } from '@/redux/selector/auth.selector';

// types
import { ArtItem } from '@/types/art';

type FeaturedSectionNewProps = {
  needToRefetch: boolean;
  setNeedToRefetch: Dispatch<SetStateAction<boolean>>;
};

const FeaturedSectionNew = ({ needToRefetch, setNeedToRefetch }: FeaturedSectionNewProps) => {
  const dispatch = useAppDispatch();
  const isAuthUser = checkAuthUser();
  const { isLoading, data, refetch } = useGetFeaturedArtsQuery({});
  const [featured, setFeatured] = useState([]);
  const [noData, setNoData] = useState<boolean>(false);
  useGetLikesQuery({});
  const likeArtIds = getLikeArtIds();
  const [addLike, { isError: isLikeError, isSuccess: isLikeAddSuccess, error }] =
    useAddLikeMutation();
  const [
    removeLike,
    { isError: isRemoveError, isSuccess: isLikeRemoveSuccess, error: removeError }
  ] = useRemoveLikeMutation();

  const handleLikeClick = async (itemId: number) => {
    try {
      if (isAuthUser) {
        const isLiked = likeArtIds?.includes(itemId) || false;
        const formData = new FormData();
        formData.append('item_id', String(itemId));
        if (isLiked) {
          removeLike(formData);
        } else {
          addLike(formData);
        }
      } else {
        dispatch(openAuthModal());
      }
    } catch (error) {
      console.log('>>> handleLikeClick', error);
    }
  };

  useEffect(() => {
    if (needToRefetch) {
      refetch();
      setNeedToRefetch(false);
    }
  }, [needToRefetch]);

  useEffect(() => {
    if (isLikeAddSuccess || isLikeRemoveSuccess) {
      refetch();
      setNeedToRefetch(true);
    }
  }, [isLikeAddSuccess, isLikeRemoveSuccess]);

  useEffect(() => {
    if (isLikeError || isRemoveError) {
      console.log({ error, removeError });
      Swal.fire({
        title: 'Error',
        text: 'Ooops! There Is Something Wrong!',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isLikeError, isRemoveError]);

  useEffect(() => {
    if (!isLoading && data?.data?.length > 0) {
      setFeatured(data?.data);
      setNoData(false);
    } else {
      setNoData(true);
    }
  }, [isLoading, data, featured]);

  return (
    <section className="sm:pt-[130px] pt-16 mb-20">
      <div className="featured-gallery-wrapper flex xl:gap-5 lg:gap-4">
        <div className="flex flex-col items-start w-[292px] shrink-0 sm:w-[355px] xl:ml-10 lg:ml-8 px-5 sm:px-7">
          <span className="text-sm text-[#A0A0A0] font-medium uppercase">All TIME BEST</span>
          <SectionTitle content="Featured Arts" className="mt-2 sm:mt-3 sm:mb-6 mb-3" />
          <Text className="mb-4 sm:mb-12">
            Captivating and evocative, featured art mesmerizes with its unique expression, telling
            compelling stories through color, form, and emotion.
          </Text>
          <Link
            href="/all-artwork"
            className="text-black w-[140px] flex gap-3 text-base font-medium cursor-pointer"
          >
            Explore Now <Icon name="arrow-right-long" />
          </Link>
        </div>
        <div className="featured-gallery w-full px-5 sm:px-6">
          <div className="featured-gallery md:gap-10 gap-8">
            {<FeaturedArtSkeletonList isLoading={isLoading} items={5} />}
            {isLoading && featured?.length > 0 && noData && (
              <div className="flex flex-col items-center w-full">
                <Img
                  src="/assets/img/feature-gallery/no-featured.png"
                  width={500}
                  height={250}
                  alt="No Featured Data"
                  className="sm:h-[250px] h-auto sm:w-[500px] w-full"
                />
                <Text className="text-orange text-lg font-medium mt-3">No Art available now</Text>
              </div>
            )}
            {!noData && (
              <Swiper
                className="w-full"
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
                scrollbar={{
                  draggable: true,
                  horizontalClass: 'feature-scroll',
                  dragClass: 'feature-drag-scroll',
                  dragSize: (770 / 12) * 5
                }}
                breakpoints={{
                  360: {
                    slidesPerView: 1,
                    spaceBetween: 2
                  },
                  390: {
                    slidesPerView: 1,
                    spaceBetween: 8
                  },
                  540: {
                    slidesPerView: 2,
                    spaceBetween: 8
                  },
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 8
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 14
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16
                  },
                  810: {
                    slidesPerView: 3,
                    spaceBetween: 16
                  },
                  994: {
                    slidesPerView: 2,
                    spaceBetween: 18
                  },
                  1190: {
                    slidesPerView: 3,
                    spaceBetween: 18
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 18
                  },
                  1366: {
                    slidesPerView: 3,
                    spaceBetween: 24
                  },
                  1446: {
                    slidesPerView: 3,
                    spaceBetween: 24
                  },
                  1646: {
                    slidesPerView: 5,
                    spaceBetween: 32
                  }
                }}
              >
                {!isLoading &&
                  featured?.length > 0 &&
                  featured?.map((item: ArtItem, index: number) => (
                    <SwiperSlide key={index}>
                      <FeatureItem
                        key={index}
                        thumbnail={item?.image_path}
                        title={item?.item_name}
                        price={item?.price_detail?.final_price || item?.regular_price}
                        isTopRated={true}
                        country={item?.mainOwner?.country?.country_name}
                        flagUrl={item?.mainOwner?.country?.country_badges}
                        itemLabel={item?.item_label_by_system}
                        href={`/arts/${item?.item_slug}`}
                        itemId={item?.item_id}
                        like={likeArtIds?.includes(item?.item_id) || false}
                        totalFavorite={item?.total_favorite}
                        artistId={item?.mainOwner?.id}
                        priceStatus={item?.price_status}
                        priceFluctuation={item?.price_percent}
                        vendorId={Number(item?.current_owner_id?.id)}
                        onLikeClick={handleLikeClick}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSectionNew;
