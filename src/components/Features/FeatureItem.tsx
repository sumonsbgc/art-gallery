/* eslint-disable no-unused-vars */
import Image from 'next/image';
import React from 'react';
import { Text, Title } from '../common';
// import { Icon } from '../ui';
import { getValidNumber, moneyFormat, shortTitle } from '@/utils';
import { Icon } from '../ui';
import Badge from '../common/Badge';
import Link from 'next/link';
import Img from '../common/Img';

type FeatureItemProp = {
  thumbnail: string;
  title: string;
  price: number;
  flagUrl: string;
  country: string;
  isTopRated: boolean;
  href: string;
  itemLabel: string;
  itemId: number;
  like?: boolean;
  artistId: number;
  vendorId: number;
  onLikeClick?: (itemId: number, artistId: number, vendorId: number) => void;
  totalFavorite?: number;
  priceStatus: string;
  priceFluctuation: number;
};

const FeatureItem = ({
  itemId,
  artistId,
  vendorId,
  thumbnail,
  title,
  isTopRated,
  price,
  flagUrl,
  country,
  like,
  onLikeClick,
  itemLabel,
  totalFavorite,
  priceStatus,
  priceFluctuation,
  href
}: FeatureItemProp) => {
  return (
    <div className="feature-item">
      <div className="w-full h-[275px] sm:h-[360px] relative">
        {itemLabel && <Badge content={itemLabel} className="z-10" />}
        <span className="h-[23px] px-2 py-4 bg-[#848484]/75 rounded-full flex justify-center items-center gap-1 absolute right-2 top-3 z-10">
          <span className="text-white text-[14px] font-medium">{totalFavorite}</span>
          <Icon
            name={like ? 'heart-fill' : 'heart'}
            handleClick={() => onLikeClick && onLikeClick(itemId, vendorId, artistId)}
            color="white"
          />
        </span>
        <Link href={href} className="w-full h-full relative">
          <Img src={thumbnail} alt={title} layout />
        </Link>
      </div>
      <div className="gallery__content">
        <div className="flex justify-between sm:pt-4 pt-3">
          <Link href={href}>
            <Title content={shortTitle(title)} className="capitalize" />
          </Link>
          <div className="flex gap-3">
            <div className="flex">
              <span className="text-black text-base font-medium">{moneyFormat(price)}</span>
            </div>
            <div>
              {priceStatus && priceStatus.toLocaleLowerCase() === 'down' ? (
                <Text className="flex gap-1 text-xs items-center text-red font-medium">
                  <Icon name="lower-triangle" />
                  {priceFluctuation ? `${getValidNumber(priceFluctuation).toFixed(2)}%` : '0%'}
                </Text>
              ) : (
                <Text className="flex gap-1 text-xs items-center text-green font-medium">
                  <Icon name="upper-triangle" />
                  {priceFluctuation ? `${getValidNumber(priceFluctuation).toFixed(2)}%` : '0%'}
                </Text>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1 items-center mt-1">
          <Image src={flagUrl} alt={country} width="22" height="16" loading="eager" />
          <span className="font-light text-black text-sm">{country}</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
