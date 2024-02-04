'use client';

import { Dispatch, SetStateAction } from 'react';

// components
import ArtSlide from './ArtSlide';

// redux
import {
  useGetHomeTopRatedQuery,
  useGetHomeHighlyAppreciateQuery,
  useGetHomeTopHundredQuery,
  useGetHomeHotSellerQuery,
  useGetHomeMostLikeQuery,
  useGetHomeMostReviewQuery
} from '@/redux/features/home/homeApi';

type ArtSlidesProps = {
  needToRefetch: boolean;
  setNeedToRefetch: Dispatch<SetStateAction<boolean>>;
};

export default function ArtSlides({ needToRefetch, setNeedToRefetch }: ArtSlidesProps) {
  const {
    data: topRatedArt,
    isLoading: topRatedLoading,
    refetch: topRatedRefetch
  } = useGetHomeTopRatedQuery({});
  const {
    data: highlyAppreciateArt,
    isLoading: highlyAppreciateLoading,
    refetch: highlyAppreciateRefetch
  } = useGetHomeHighlyAppreciateQuery({});
  const {
    data: topHundredArt,
    isLoading: topHundredLoading,
    refetch: topHundredRefetch
  } = useGetHomeTopHundredQuery({});
  const {
    data: hotSellerArt,
    isLoading: hotSellerLoading,
    refetch: hotSellerRefetch
  } = useGetHomeHotSellerQuery({});
  const {
    data: mostLikeArt,
    isLoading: mostLikeLoading,
    refetch: mostLikeRefetch
  } = useGetHomeMostLikeQuery({});
  const {
    data: mostReviewArt,
    isLoading: mostReviewLoading,
    refetch: mostReviewRefetch
  } = useGetHomeMostReviewQuery({});

  const artSlideData = [
    {
      id: 1,
      title: 'Top Rated',
      allListUrl: '/all-artwork?top_rated=1',
      data: topRatedArt?.data,
      isLoading: topRatedLoading,
      refetch: topRatedRefetch
    },
    {
      id: 2,
      title: 'Highly Appreciated',
      allListUrl: '/all-artwork?highly_appreciate=1',
      data: highlyAppreciateArt?.data,
      isLoading: highlyAppreciateLoading,
      refetch: highlyAppreciateRefetch
    },
    {
      id: 3,
      title: 'Top 100',
      allListUrl: '/all-artwork?top_hundred=1',
      data: topHundredArt?.data,
      isLoading: topHundredLoading,
      refetch: topHundredRefetch
    },
    {
      id: 4,
      title: 'Hot Selling',
      allListUrl: '/all-artwork?hot_seller=1',
      data: hotSellerArt?.data,
      isLoading: hotSellerLoading,
      refetch: hotSellerRefetch
    },
    {
      id: 5,
      title: 'Most Liked',
      allListUrl: '/all-artwork?most_like=1',
      data: mostLikeArt?.data,
      isLoading: mostLikeLoading,
      refetch: mostLikeRefetch
    },
    {
      id: 6,
      title: 'Most Reviewed',
      allListUrl: '/all-artwork?most_review=1',
      data: mostReviewArt?.data,
      isLoading: mostReviewLoading,
      refetch: mostReviewRefetch
    }
  ];

  // useEffect(() => {
  //   if (needToRefetch) {
  //     topRatedRefetch();
  //     highlyAppreciateRefetch();
  //     topHundredRefetch();
  //     hotSellerRefetch();
  //     mostLikeRefetch();
  //     mostReviewRefetch();

  //     // reset
  //     setNeedToRefetch(false);
  //   }
  // }, [
  //   highlyAppreciateRefetch,
  //   hotSellerRefetch,
  //   mostLikeRefetch,
  //   mostReviewRefetch,
  //   needToRefetch,
  //   setNeedToRefetch,
  //   topHundredRefetch,
  //   topRatedRefetch
  // ]);

  console.log(artSlideData);

  return (
    <div className="bg-[#fffcfc] pt-[70px]">
      {artSlideData.map((artSlide) => (
        <ArtSlide
          key={artSlide.id}
          needToRefetch={needToRefetch}
          setNeedToRefetch={setNeedToRefetch}
          title={artSlide.title}
          allListUrl={artSlide.allListUrl}
          arts={artSlide.data?.data}
          isLoading={artSlide.isLoading}
          refetch={artSlide.refetch}
        />
      ))}
    </div>
  );
}
