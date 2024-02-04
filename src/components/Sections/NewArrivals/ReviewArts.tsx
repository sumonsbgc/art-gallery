// import Link from 'next/link';

// components
// import Wrapper from '@/components/layout/Wrapper';
import { ReviewArtCard } from '@/components/common';

// redux
import {
  useGetLikesQuery,
  useAddLikeMutation,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { getUserInfo } from '@/redux/selector/auth.selector';
import { getLikeArtIds } from '@/redux/selector/like.selector';
import { ArtItem } from '@/types/art';

// data
// import { topRatedArt } from '@/data/home';

type ArtsProp = {
  arts?: ArtItem[];
};

const ReviewArts = ({ arts }: ArtsProp) => {
  useGetLikesQuery({});
  const user = getUserInfo();
  const likeArtIds = getLikeArtIds();
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();

  const handleLikeClick = async (itemId: number, artistId: number, vendorId: number) => {
    try {
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
    } catch (error) {
      console.log('>>> handleLikeClick', error);
    }
  };

  return (
    <div className="w-full mt-8 md:mt-14 mb-10">
      <div className="w-full px-1 sm:px-2 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {arts?.map((art) => (
          <ReviewArtCard
            key={art.item_id}
            itemId={art.item_id}
            slug={art.item_slug}
            title={art.item_name}
            imgUrl={art.image_path}
            rating={art?.total_avg_rating}
            price={art.regular_price}
            artistProfilePic={art?.mainOwner?.image_path}
            artistName={art?.mainOwner?.name}
            artistId={art?.mainOwner?.id}
            vendorId={Number(art?.current_owner_id?.id)}
            itemLabel={art?.item_label_by_system}
            artistAbout={art?.mainOwner?.about}
            priceStatus={art?.price_status}
            priceFluctuation={art?.price_percent}
            totalReviews={art?.total_review_product}
            flagUrl={art?.mainOwner?.country?.country_badges}
            country={art?.mainOwner?.country?.country_name}
            like={likeArtIds?.includes(art?.item_id) || false}
            onLikeClick={handleLikeClick}
            totalFavorite={art?.total_favorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewArts;
