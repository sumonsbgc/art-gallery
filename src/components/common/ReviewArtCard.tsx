'use client';

// import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import { Icon } from '@/components/ui';
import { Rating, Title, Badge, Text, Img } from '@/components/common';

// utils
import { countLike, getReviewLabel, moneyFormat } from '@/utils';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';

type ArtCardProp = {
  itemId: number;
  imgUrl: string;
  title: string;
  slug: string;
  price: number;
  rating: number;
  like?: boolean;
  artistProfilePic: string;
  artistName: string;
  artistId: number;
  vendorId: number;
  artistAbout: string;
  totalReviews: number;
  flagUrl: string;
  country: string;
  priceStatus: string;
  priceFluctuation: number;
  totalFavorite: number;
  itemLabel: string;
  // eslint-disable-next-line no-unused-vars
  onLikeClick?: (itemId: number, vendorId: number, artistId: number) => void;
};

const ReviewArtCard = ({
  itemId,
  imgUrl,
  title,
  slug,
  price,
  like,
  artistProfilePic,
  artistName,
  itemLabel,
  artistId,
  vendorId,
  artistAbout,
  totalReviews,
  flagUrl,
  country,
  priceStatus,
  priceFluctuation,
  onLikeClick,
  totalFavorite,
  rating
}: ArtCardProp) => {
  // const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    // <div className="w-[165px] sm:w-[170px] md:w-[180px] lg:w-[190px] xl:w-[200px] 2xl:w-[230px] flex-shrink-0 cursor-pointer">
    <div className="w-full flex-shrink-0 cursor-pointer bg-[#F6F6F6]">
      <div className="relative bg-gray w-full h-[195px] sm:h-[210px] md:h-[230px] lg:h-[240px] xl:h-[250px] 2xl:h-[260px] flex justify-center items-center">
        {itemLabel && <Badge content={itemLabel} />}
        <span className="h-[23px] px-2 py-4 bg-[#848484]/75 rounded-full flex justify-center items-center gap-1 absolute right-2 top-3 z-20">
          <span className="text-white text-[14px] font-medium">
            {countLike(totalFavorite || 0)}
          </span>
          <Icon
            name={like ? 'heart-fill' : 'heart'}
            handleClick={() => onLikeClick?.(itemId, vendorId, artistId)}
            color="white"
          />
        </span>
        <Link href={`/dashboard/critics-review/${slug}`} className="w-full h-full">
          <Image
            src={imgUrl}
            alt={title}
            width={230}
            height={260}
            className="w-full h-[195px] sm:h-[210px] md:h-[230px] lg:h-[240px] xl:h-[250px] 2xl:h-[260px]"
          />
        </Link>
      </div>
      <div className="gallery__content bg-[#F6F6F6] px-4 py-[14px]">
        <div className="flex flex-col text-start">
          <div className="flex items-center justify-between mb-2 flex-wrap">
            <div className="flex gap-[12px]">
              <span className="text-gray4 text-base italic font-semibold">
                {moneyFormat(price)}
              </span>
              <div>
                {priceStatus && priceStatus === 'down' ? (
                  <Text className="flex gap-2 text-xs items-center text-red font-medium">
                    <Icon name="lower-triangle" />
                    {priceFluctuation ? `${Math.ceil(priceFluctuation)}%` : '0%'}
                  </Text>
                ) : (
                  <Text className="flex gap-2 text-xs items-center text-green font-medium">
                    <Icon name="upper-triangle" />
                    {priceFluctuation ? `${Math.ceil(priceFluctuation)}%` : '0%'}
                  </Text>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span>
                <Rating rating={1} size={16} color="#F6D008" iconsCount={1} readOnly />
              </span>
              <span className="text-black text-sm font-medium">{Math.floor(rating)}/5</span>
            </div>
          </div>
          <Link href={`/dashboard/critics-review/${slug}`} className="w-full h-full">
            <Title
              content={title}
              className="font-normal capitalize !text-lg border-b border-[#DBDBDB] pb-1"
            />
          </Link>
          <div className="flex gap-[10px] flex-col">
            <div className="flex justify-between pt-2 items-center flex-wrap">
              <div className="flex items-center gap-1 relative">
                {artistProfilePic && (
                  <Link href={`/artists/${artistId}/${artistName}`}>
                    <Img
                      src={artistProfilePic}
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8"
                      alt=""
                    />
                  </Link>
                )}
                <Link href={`/artists/${artistId}/${artistName}`}>
                  <Title content={artistName} className="!text-xs capitalize underline" />
                </Link>
                {flagUrl && (
                  <Img
                    src={flagUrl}
                    alt={country}
                    width={18}
                    height={12}
                    className="w-[18px] h-[12px]"
                  />
                )}
              </div>
              <Text className="text-orange !text-xs font-medium underline">
                {getReviewLabel(totalReviews)}
              </Text>
            </div>
            <Text className="!text-sm">
              {artistAbout && artistAbout.slice(0, 130)}...{' '}
              <Link
                href={`/artists/${artistId}/${artistName}/#artist-info`}
                onClick={() => dispatch(toggleActiveTab({ activeTab: 'artist-info' }))}
                className="text-orange italic capitalize font-normal underline"
              >
                More
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewArtCard;
