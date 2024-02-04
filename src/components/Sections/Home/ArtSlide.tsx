/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar, Navigation } from 'swiper/modules';

// styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

// components
import { ArtCard, TopRatedArtSkeletonList } from '@/components/common';
// import Wrapper from '@/components/layout/Wrapper';

// redux
import { openAuthModal } from '@/redux/features/auth/authSlice';
import {
  useAddLikeMutation,
  useGetLikesQuery,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { useAppDispatch } from '@/redux/hooks';
import { checkAuthUser, getUserInfo } from '@/redux/selector/auth.selector';
import { getLikeArtIds } from '@/redux/selector/like.selector';

// types
import { ArtItem } from '@/types/art';

type TopRatedProps = {
  needToRefetch: boolean;
  setNeedToRefetch: Dispatch<SetStateAction<boolean>>;
  title: string;
  allListUrl: string;
  arts: ArtItem[];
  isLoading: boolean;
  refetch: () => void;
};

const ArtSlide = ({
  needToRefetch,
  setNeedToRefetch,
  title,
  allListUrl,
  arts,
  isLoading,
  refetch
}: TopRatedProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthUser = checkAuthUser();
  const user = getUserInfo();
  useGetLikesQuery({});
  const likeArtIds = getLikeArtIds();
  const [addLike, { isError: isLikeError, isSuccess: isLikeAddSuccess, error }] =
    useAddLikeMutation();
  const [
    removeLike,
    { isError: isRemoveError, isSuccess: isLikeRemoveSuccess, error: removeError }
  ] = useRemoveLikeMutation();

  const handleLikeClick = async (itemId: number, artistId: number, vendorId: number) => {
    try {
      if (isAuthUser) {
        if (user?.id === artistId || vendorId === user?.id) {
          return;
        }
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
      console.log(error, removeError);
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

  return (
    <section className={`w-full pt-0 ${arts?.length === 0 && 'hidden'}`}>
      <div className="w-full px-2 sm:px-6 md:px-16 bg-[#fefafa70]">
        <div className="topRatedWrapper relative flex flex-col items-center !px-[5px]">
          <section className="w-full justify-between items-center flex mb-5">
            <h3 className="text-center text-neutral-900 text-2xl sm:text-3xl font-medium">
              {title}
            </h3>

            <Link
              href={allListUrl}
              target="_blank"
              className="w-[88px] h-8 border-2 border-orange backdrop-blur-[8.30px] justify-center items-center flex text-right text-orange text-sm font-normal"
            >
              View All
            </Link>
          </section>

          <div className="gallery-wrapper">
            {<TopRatedArtSkeletonList isLoading={isLoading} items={8} />}

            {!isLoading && (
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
                    slidesPerView: 3,
                    spaceBetween: 16
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 18
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 18
                  },
                  1366: {
                    slidesPerView: 4,
                    spaceBetween: 24
                  },
                  1446: {
                    slidesPerView: 5,
                    spaceBetween: 24
                  },
                  1646: {
                    slidesPerView: 5,
                    spaceBetween: 32
                  }
                }}
              >
                {Array.isArray(arts) &&
                  arts?.length > 0 &&
                  arts?.map((art: ArtItem) => (
                    <SwiperSlide key={art?.item_id}>
                      <ArtCard
                        itemId={art.item_id}
                        slug={art.item_slug}
                        title={art.item_name}
                        imgUrl={art.image_path}
                        rating={art.total_avg_rating}
                        price={art?.price_detail?.final_price || art?.regular_price}
                        artistProfilePic={art?.mainOwner?.image_path}
                        artistName={art?.mainOwner?.name}
                        artistId={art?.mainOwner?.id}
                        vendorId={Number(art?.current_owner_id?.id)}
                        artistAbout={art?.mainOwner?.about}
                        priceStatus={art?.price_status}
                        priceFluctuation={art?.price_percent}
                        totalReviews={art?.total_review_product}
                        itemLabel={art?.item_label_by_system}
                        flagUrl={art?.mainOwner?.country?.country_badges}
                        country={art?.mainOwner?.country?.country_name}
                        onRedirectClick={() => router.push('arts/' + art?.item_slug)}
                        like={likeArtIds?.includes(art.item_id) || false}
                        totalFavorite={art?.total_favorite}
                        onLikeClick={handleLikeClick}
                        showShadow
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

export default ArtSlide;
