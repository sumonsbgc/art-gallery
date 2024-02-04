'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import Wrapper from '@/components/layout/Wrapper';
import Layout from '@/components/layout';
import { BreadCrumb } from '@/components/ui';
import { ArtCard, ComponentLoader } from '@/components/common';

// redux
import {
  useGetLikesQuery,
  useLazyGetLikesQuery,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { getLikeArtList, getTotalLikeArt } from '@/redux/selector/like.selector';
// utils
import { ArtItem } from '@/types/art';

const LikedArts = () => {
  const router = useRouter();
  const { isLoading } = useGetLikesQuery({});
  const [getLikes] = useLazyGetLikesQuery();
  const likeArtList: ArtItem[] = getLikeArtList();
  const totalLikes = getTotalLikeArt();
  const [removeLike] = useRemoveLikeMutation();
  const [page, setPage] = useState<number>(1);

  const handleRemoveLike = async (itemId: number) => {
    try {
      const formData = new FormData();
      formData.append('item_id', String(itemId));

      await removeLike(formData);
    } catch (error) {
      console.log('>>> handleRemoveLike', error);
    }
  };

  const handleLoadMore = async () => {
    const res = await getLikes({ page: page + 1 });

    if (res?.data?.status === 'success') {
      if (res?.data?.data?.next_page_url) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <Layout headerBottomBorder>
      <section className="productDetailSection pt-5 pb-20">
        <Wrapper>
          <BreadCrumb parentPage="Home" currentPage="Favorite Arts" />
          {isLoading && <ComponentLoader />}
          <InfiniteScroll
            dataLength={likeArtList?.length}
            next={handleLoadMore}
            hasMore={likeArtList?.length < totalLikes}
            loader={
              <div className="flex justify-center my-4">
                <span className="page-loader" />
              </div>
            }
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likeArtList?.map((art) => (
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
                  itemLabel={art?.item_label_by_system}
                  artistAbout={art?.mainOwner?.about}
                  priceStatus={art?.price_status}
                  priceFluctuation={art?.price_percent}
                  totalReviews={art?.total_review_artist}
                  flagUrl={art?.mainOwner?.country?.country_badges}
                  country={art?.mainOwner?.country?.country_name}
                  like={true}
                  onLikeClick={handleRemoveLike}
                  onRedirectClick={() => router.push(`arts/${art?.item_slug}`)}
                  totalFavorite={art?.total_favorite}
                />
              ))}
            </div>
          </InfiniteScroll>
        </Wrapper>
      </section>
    </Layout>
  );
};

export default LikedArts;
