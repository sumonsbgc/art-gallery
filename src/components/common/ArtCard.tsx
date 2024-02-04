'use client';

import Link from 'next/link';

// components
import { Icon } from '@/components/ui';
import { Rating, Title, Badge, Text, Img } from '@/components/common';

// utils
import { countLike, moneyFormat, getValidNumber, getReviewLabel } from '@/utils';

// redux
import { useAppDispatch } from '@/redux/hooks';
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';

type ArtCardProp = {
  itemId: number;
  imgUrl: string;
  title: string;
  slug?: string;
  price: number;
  rating: number;
  artistProfilePic: string;
  artistName: string;
  artistId: number;
  vendorId: number;
  artistAbout: string;
  totalReviews: number;
  flagUrl: string;
  country: string;
  itemLabel: string;
  priceStatus: string;
  priceFluctuation: number;
  totalFavorite?: number;
  like?: boolean;
  onRedirectClick?: () => void;
  // eslint-disable-next-line no-unused-vars
  onLikeClick?: (itemId: number, vendorId: number, artistId: number) => void;
  showShadow?: boolean;
};

const ArtCard = ({
  itemId,
  vendorId,
  imgUrl,
  title,
  price,
  like,
  artistProfilePic,
  artistName,
  artistId,
  artistAbout,
  totalReviews,
  slug,
  flagUrl,
  country,
  priceStatus,
  priceFluctuation,
  rating,
  itemLabel,
  totalFavorite,
  onLikeClick,
  // onRedirectClick,
  showShadow = false
}: ArtCardProp) => {
  const dispatch = useAppDispatch();

  const exceptContent =
    artistAbout?.length > 130 ? artistAbout?.substring(0, 130) + '... ' : artistAbout;

  const styles = showShadow
    ? {
        boxShadow: '0px 7px 29px 0px rgba(255, 111, 97, 0.15)',
        background: '#fff',
        height: 'inherit'
      }
    : {};

  return (
    <div
      className="w-[310px] sm:w-full mx-auto flex-shrink-0 cursor-pointer bg-[#F6F6F6]"
      style={styles}
    >
      <div className="relative w-full bg-[#dfdfdf] h-[370px] sm:h-[210px] md:h-[230px] lg:h-[240px] xl:h-[250px] 2xl:h-[260px] flex justify-center items-center">
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
        {imgUrl && (
          <Link href={`/arts/${slug}`} className="w-full h-full relative">
            <Img
              src={imgUrl}
              alt={title}
              className="w-full h-[195px] sm:h-[210px] md:h-[230px] lg:h-[240px] xl:h-[250px] 2xl:h-[260px]"
              layout
            />
          </Link>
        )}
      </div>

      <div className="gallery__content bg-transparent px-4 py-[14px]">
        <div className="flex flex-col text-start">
          <div className="flex items-center justify-between flex-wrap mb-2">
            <div className="flex gap-[12px]">
              <span className="text-gray4 text-base italic font-semibold">
                {moneyFormat(price)}
              </span>
              <div>
                {priceStatus && priceStatus.toLocaleLowerCase() === 'down' ? (
                  <Text className="flex gap-2 text-xs items-center text-red font-medium">
                    <Icon name="lower-triangle" />
                    {priceFluctuation ? `${getValidNumber(priceFluctuation).toFixed(2)}%` : '0%'}
                  </Text>
                ) : (
                  <Text className="flex gap-2 text-xs items-center text-green font-medium">
                    <Icon name="upper-triangle" />
                    {priceFluctuation ? `${getValidNumber(priceFluctuation).toFixed(2)}%` : '0%'}
                  </Text>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className="-mt-1 mr-1">
                <Rating rating={1} size={16} color="#F6D008" iconsCount={1} readOnly />
              </span>
              <span className="text-black text-sm font-medium">{Math.floor(rating)}/5</span>
            </div>
          </div>
          <Link href={`/arts/${slug}`}>
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
            <Text className="!text-sm whitespace-break-spaces text-ellipsis overflow-hidden w-full">
              {exceptContent && exceptContent}
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

export default ArtCard;
