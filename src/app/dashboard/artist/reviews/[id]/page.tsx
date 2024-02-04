'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// import Image from 'next/image';

// components
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import { RatingView } from '@/components/common';
import ArtSidebarInfo from '@/components/dashboard/artist/ArtWork/ArtSidebarInfo';

// redux
import { useGetSingleReviewDetailsQuery } from '@/redux/features/artist/artistApi';
import { getSingleReviewDetails } from '@/redux/selector/artist.selector';

const ReviewDetail = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const reviewDetails = getSingleReviewDetails();
  const userType = searchParams.get('userType') as 'critic' | 'customer';
  const payload = {
    itemId: Number(params.id),
    userType
  };
  useGetSingleReviewDetailsQuery(payload);

  return (
    <Wrapper>
      <Link href="/dashboard/artist/reviews" className="flex items-center gap-2 cursor-pointer">
        <Icon name="arrow-left" size="22" color="black" />
        <h4 className="text-right text-black text-base font-medium">Back</h4>
      </Link>

      <div className="mt-6 flex items-start justify-between">
        <aside className="w-[65%]">
          <div className="mb-[10px] flex justify-between items-center">
            <h3 className="text-black text-xl font-medium">
              <span className="capitalize">{userType}</span> review by{' '}
              {reviewDetails?.review_detail?.userDetail?.name}
            </h3>

            <div className="items-center gap-3 flex">
              <p className="text-gray7 text-sm font-normal">Given Rate</p>

              <div className="h-7 px-3 py-1 bg-black rounded-full justify-center items-center gap-1 flex">
                <RatingView
                  rating={Number(reviewDetails?.review_detail?.rating || 0)}
                  size="12"
                  color="white"
                  textClassName="text-white text-sm font-medium leading-tight italic pl-1"
                  gap="1.76px"
                />
              </div>
            </div>
          </div>

          <p className="w-full text-justify text-gray5 text-sm font-normal italic">
            {reviewDetails?.review_detail?.review}
          </p>

          <section className="mt-[66px]">
            <Link
              href={`/dashboard/artist/reviews?artId=${reviewDetails?.review_detail?.item_id?.item_id}`}
              className="cursor-pointer"
            >
              <h4 className="text-left text-black text-base font-medium">
                See all reviews of this Art
              </h4>

              <div className="flex items-center -mt-3">
                <div className="w-[190px] border border-black -mr-1.5" />
                <Icon
                  name="arrow-left"
                  size="34"
                  color="black"
                  className="rotate-180"
                  noHoverEffect
                />
              </div>
            </Link>
          </section>
        </aside>

        {/* art review and image */}
        <aside className="max-w-[341px]">
          <ArtSidebarInfo
            thumbnail={reviewDetails?.review_detail?.item_id?.image_path}
            avgReviews={
              reviewDetails?.review_detail?.item_id?.review_opinion === 1 ? 'Positive' : 'Negative'
            }
            avrRating={Number(Number(reviewDetails?.avg_rating)?.toFixed(1)) || 0}
            criticRating={Number(reviewDetails?.total_review) || 0}
            totalLikes={reviewDetails?.total_like || 0}
          />
        </aside>
      </div>
    </Wrapper>
  );
};

export default ReviewDetail;
