import { useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { Img, Text } from '@/components/common';
import { Icon } from '@/components/ui';

// types
import { MyReviewItem } from '@/redux/features/critic/critic.types';

// utils
import { countLike, getValidNumber } from '@/utils';
import Link from 'next/link';

type CriticReviewItemProps = {
  review: MyReviewItem;
};

const CriticReviewItem = ({ review }: CriticReviewItemProps) => {
  const router = useRouter();
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const reviewText = review?.review;
  let reviewContent: string = '';
  if (reviewText) {
    if (reviewText?.length > 625) {
      reviewContent = seeMore ? reviewText?.slice(0, 650) : reviewText;
    } else {
      reviewContent = reviewText;
    }
  }

  return (
    <div
      className={
        'w-full min-h-[195px] bg-white border border-black border-opacity-10 flex lg:gap-16 gap-4 items-start p-3 mb-4 lg:flex-row flex-col'
      }
    >
      <section className="flex items-center gap-4 sm:gap-5 h-full">
        {/* image */}
        <aside className="w-[130px] h-[155px] sm:w-[143px] sm:h-[195px] max-h-[170.60px] bg-neutral-100 relative">
          {review?.itemDetail?.item_label_by_system ? (
            <div className="absolute top-2 left-2 z-30 px-[7px] py-1 bg-neutral-900 justify-center items-center gap-2.5 flex text-white text-xs font-normal">
              {review?.itemDetail?.item_label_by_system}
            </div>
          ) : null}
          <Img
            layout
            src={review?.itemDetail?.image_path}
            alt={review?.itemDetail?.item_name}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => router.push(`/arts/${review?.itemDetail?.item_slug}`)}
          />
        </aside>

        <aside className="flex-col justify-start items-start gap-1.5 flex">
          {/* likes */}
          <section className="justify-between relative items-center gap-[18px] flex">
            {/* ratings */}
            <div className="justify-start items-center flex gap-1">
              <Icon name="star-fill" color="yellow" size="20" noHoverEffect />
              <div className="text-lightgray3 text-sm font-normal flex gap-1">
                <span className="text-black text-sm font-medium pl-1">
                  {Math.round(Math.ceil(review?.rating) || 5)}/5
                </span>
                <span>({Math.ceil(Number(review?.itemDetail?.total_review_product) || 0)})</span>
              </div>
            </div>
            <div className="justify-start items-center gap-1.5 flex">
              <Icon name="heart-fill" color="orange" size="18" />
              <span className="text-orange text-base font-semibold">
                {countLike(review?.itemDetail?.total_favorite || 0)}
              </span>
            </div>
          </section>
          {/* product details */}
          <div className="flex-col justify-start items-start gap-1.5 flex">
            <button
              className="text-neutral-900 text-sm sm:text-base font-medium capitalize cursor-pointer bg-transparent border-none outline-none"
              onClick={() => router.push(`/arts/${review?.itemDetail?.item_slug}`)}
            >
              {review?.itemDetail?.item_name}
            </button>
            <div className="w-full flex gap-3">
              <Link
                href={`/artists/${review?.itemDetail?.mainOwner?.id}/${decodeURIComponent(
                  review?.itemDetail?.mainOwner?.name
                )}`}
              >
                <span className="text-black text-base font-normal">
                  {review?.itemDetail?.mainOwner?.name}
                </span>
              </Link>
              <picture className="w-[21px] h-[14px] rounded-sm mt-1.5">
                <img
                  src={review?.itemDetail?.mainOwner?.country?.country_badges}
                  alt="location"
                  className="w-[21px] h-[14px]"
                />
              </picture>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-center text-neutral-500 text-base sm:text-lg font-medium">
                ${review?.itemDetail?.regular_price}
              </p>
              <div>
                {review?.itemDetail?.price_status &&
                review?.itemDetail?.price_status.toLocaleLowerCase() === 'down' ? (
                  <Text className="flex gap-2 text-xs items-center text-red font-medium">
                    <Icon name="lower-triangle" />
                    {review?.itemDetail?.price_percent
                      ? `${getValidNumber(review?.itemDetail?.price_percent).toFixed(2)}%`
                      : '0%'}
                  </Text>
                ) : (
                  <Text className="flex gap-2 text-xs items-center text-green font-medium">
                    <Icon name="upper-triangle" />
                    {review?.itemDetail?.price_percent
                      ? `${getValidNumber(review?.itemDetail?.price_percent).toFixed(2)}%`
                      : '0%'}
                  </Text>
                )}
              </div>
            </div>
            <p className="flex text-neutral-500 text-xs sm:text-sm font-normal italic items-center">
              <Text className="sm:flex-shrink-0">
                Your Recommended Price - <span className="font-medium">{review?.price}</span>
              </Text>
            </p>
          </div>
        </aside>
      </section>

      {/* review */}
      <section className="lg:w-[783px] w-full text-justify lg:py-9">
        <p className="text-stone-500 text-sm font-normal">
          {reviewContent}
          {reviewText && reviewText?.length > 625 ? (
            <span
              className="text-orange text-sm font-normal underline cursor-pointer"
              onClick={() => setSeeMore(!seeMore)}
            >
              {seeMore ? 'See Less' : 'See More'}
            </span>
          ) : (
            ''
          )}
        </p>
      </section>
    </div>
  );
};

export default CriticReviewItem;
