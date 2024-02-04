/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// components
// import Wrapper from '@/components/layout/Wrapper';
import { ArtCard } from '@/components/common';

// redux
import {
  useGetLikesQuery,
  useAddLikeMutation,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { getLikeArtIds } from '@/redux/selector/like.selector';
import { useAppDispatch } from '@/redux/hooks';
import { checkAuthUser, getUserInfo } from '@/redux/selector/auth.selector';
import { openAuthModal } from '@/redux/features/auth/authSlice';

// data
// import { topRatedArt } from '@/data/home';

// types
import { ArtItem } from '@/types/art';

type ArtsProp = {
  arts?: ArtItem[];
};

const Arts = ({ arts }: ArtsProp) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = getUserInfo();
  useGetLikesQuery({});
  const likeArtIds = getLikeArtIds();
  const isAuthUser = checkAuthUser();

  const [addLike, { isError, error }] = useAddLikeMutation();
  const [removeLike, { isError: isRemoveError, error: removeError }] = useRemoveLikeMutation();

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
    } catch (error) {
      console.log('>>> handleLikeClick', error);
    }
  };

  useEffect(() => {
    if (isError || isRemoveError) {
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
  }, [isError, isRemoveError]);

  return (
    <section>
      <div className="w-full mt-8 lg:mt-6 mb-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {arts?.map((art: ArtItem) => (
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
              like={likeArtIds?.includes(art?.item_id) || false}
              totalFavorite={art?.total_favorite}
              onLikeClick={handleLikeClick}
              onRedirectClick={() => router.push(`/arts/${art.item_slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Arts;
