'use client';
import React from 'react';
import { Title } from '../common';
import { Icon } from '../ui';
import { countLike } from '@/utils';
import Img from '../common/Img';
import Link from 'next/link';

type GalleryItemProp = {
  authorImg: string;
  authorName: string;
  authorId: number;
  likeCount: number;
  flagUrl: string;
  country: string;
  totalFavorite?: number;
  onRedirectClick?: () => void;
};

const GalleryItemNew = ({
  authorImg,
  authorName,
  authorId,
  likeCount,
  flagUrl,
  totalFavorite,
  country
}: GalleryItemProp) => {
  const styles = {
    boxShadow: '0px 7px 29px 0px rgba(255, 111, 97, 0.15)',
    background: '#fff',
    height: 'inherit'
  };
  return (
    <div
      className="w-[310px] sm:w-full mx-auto flex-shrink-0 cursor-pointer bg-[#F6F6F6]"
      style={styles}
    >
      <div className="w-full h-[260px] relative cursor-pointer">
        <span className="h-[20px] px-2 py-3 bg-[#848484]/75 rounded-full flex justify-center items-center gap-1 absolute left-3 top-3 z-20">
          <span className="text-white text-[12px] font-medium">
            {countLike(Number(totalFavorite))}
          </span>
          <Icon name="heart-fill" color="white" size="16" />
        </span>
        {authorImg && (
          <Link href={`/artists/${authorId}/${authorName}`}>
            <Img
              src={authorImg}
              alt={authorName}
              layout
              className="w-[342px] h-[260px]"
              width={342}
              height={260}
            />
          </Link>
        )}
      </div>
      <div className="gallery__content w-full h-[84px] px-6">
        <div className="flex justify-between sm:pt-5 pt-4">
          <Link href={`/artists/${authorId}/${authorName}`} className="w-full h-full">
            <Title content={authorName} className="capitalize" />
          </Link>
          <div className="flex gap-2">
            <Icon name="user-plus" color="orange" size="18" />
            <span className="text-orange text-base font-medium">{countLike(likeCount)}</span>
          </div>
        </div>

        <div className="flex gap-1 items-center mt-1">
          <Img src={flagUrl} alt={country} width={22} height={16} />
          <span className="font-light text-black text-sm">{country}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItemNew;
