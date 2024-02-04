/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar, Navigation } from 'swiper/modules';

// styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

// components
import { ArtCard, Title, UploadLoader } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';

// redux
import { useGetArtsByNativeArtistIdQuery } from '@/redux/features/arts/artsApi';
import { useAppDispatch } from '@/redux/hooks';
import {
  useAddLikeMutation,
  useGetLikesQuery,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { getLikeArtIds } from '@/redux/selector/like.selector';
import { checkAuthUser, getUserInfo } from '@/redux/selector/auth.selector';
import { openAuthModal } from '@/redux/features/auth/authSlice';

// types
import { ArtItem } from '@/types/art';

const RelatedGallery = ({
  artistId,
  artistName,
  artId
}: {
  artistId: number;
  artistName: string;
  artId: number;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [arts, setArts] = useState<ArtItem[]>([]);
  const [noData, setNoData] = useState<boolean>(false);
  const user = getUserInfo();
  useGetLikesQuery({});
  const likeArtIds = getLikeArtIds();
  const isAuthUser = checkAuthUser();

  const [addLike, { isError, error }] = useAddLikeMutation();
  const [removeLike, { isError: isRemoveError, error: removeError }] = useRemoveLikeMutation();

  const { isLoading, data } = useGetArtsByNativeArtistIdQuery(
    {
      artist_id: Number(artistId),
      art_id: Number(artId)
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const handleLikeClick = async (itemId: number, vendorId: number, artistId: number) => {
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
    } catch (err) {
      console.log('>>> handleLikeClick', err);
    }
  };

  useEffect(() => {
    if (isError || isRemoveError) {
      console.log(removeError, error);
      Swal.fire({
        title: 'Error',
        text: 'Ooops! There Is Something Wrong!',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isError, isRemoveError]);

  useEffect(() => {
    if (!isLoading && data?.data?.data?.length > 0) {
      setArts(data?.data?.data);
      setNoData(false);
    } else {
      setNoData(true);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 relative">
        <UploadLoader />
        <span>loading</span>
      </div>
    );
  }

  return (
    <section className="related-section pb-14">
      {!noData && (
        <Wrapper>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl text-black font-normal">More from</span>
            <Title content={`${artistName && artistName}`} className="!text-xl capitalize italic" />
          </div>
          <div className="gallery-wrapper">
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
                  slidesPerView: 2,
                  spaceBetween: 4
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 14
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
                  slidesPerView: 4,
                  spaceBetween: 24
                },
                1646: {
                  slidesPerView: 4,
                  spaceBetween: 32
                }
              }}
            >
              {!isLoading &&
                Array.isArray(arts) &&
                arts?.length > 0 &&
                arts?.map((art) => (
                  <SwiperSlide key={art?.item_id}>
                    <ArtCard
                      key={art.item_id}
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
                      itemLabel={art?.item_label_by_system}
                      priceStatus={art?.price_status}
                      priceFluctuation={art?.price_percent}
                      totalReviews={art?.total_review_product}
                      flagUrl={art?.mainOwner?.country?.country_badges}
                      country={art?.mainOwner?.country?.country_name}
                      like={likeArtIds?.includes(art?.item_id) || false}
                      totalFavorite={art?.total_favorite}
                      onLikeClick={handleLikeClick}
                      onRedirectClick={() => router.push(`/arts/${art.item_slug}`)}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </Wrapper>
      )}
    </section>
  );
};

export default RelatedGallery;
