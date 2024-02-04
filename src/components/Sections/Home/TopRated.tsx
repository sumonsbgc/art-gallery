/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';

// components
import { Text, ArtCard, TopRatedArtSkeletonList } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

// data
// import { topRatedArts } from '@/data/home';
// import { useGetTopRatedArtQuery } from '@/redux/features/arts/artsApi';
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
import { useGetHomeTopRatedQuery } from '@/redux/features/home/homeApi';

type TopRatedProps = {
  needToRefetch: boolean;
  setNeedToRefetch: Dispatch<SetStateAction<boolean>>;
};

const TopRated = ({ needToRefetch, setNeedToRefetch }: TopRatedProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthUser = checkAuthUser();
  const user = getUserInfo();
  const { data: topRatedArt, isLoading, isSuccess, isError, refetch } = useGetHomeTopRatedQuery({});
  const [arts, setArts] = useState([]);
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

  // const routeHandler = () => {
  //   router.push('/all-artwork');
  // };
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
    console.log(topRatedArt?.data?.data, 'TOPRATED');
    if (
      isSuccess &&
      !isError &&
      Array.isArray(topRatedArt?.data?.data) &&
      topRatedArt?.data?.data?.length > 0
    ) {
      setArts(topRatedArt?.data?.data);
    }
  }, [isSuccess, isError, topRatedArt]);

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
    <section className="topRatedSection">
      <div className="top-rated-bg"></div>
      <Wrapper>
        <div className="topRatedWrapper relative flex flex-col items-center">
          {/* {!isLoading && (
            <> */}
          <Text className="!font-light text-center text-white !text-[32px] sm:!text-6xl mb-14">
            TOP RATED ARTS
          </Text>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 mb-12 place-content-center">
            {<TopRatedArtSkeletonList isLoading={isLoading} items={8} />}
            {!isLoading &&
              Array.isArray(arts) &&
              arts?.length > 0 &&
              arts?.map((art: ArtItem) => (
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
                />
              ))}
          </div>
          <Link className="text-white flex items-center gap-2" href="/all-artwork">
            <span>discover More</span> <Icon name="arrow-right-long" color="white" />
          </Link>
        </div>
      </Wrapper>
    </section>
  );
};

export default TopRated;
