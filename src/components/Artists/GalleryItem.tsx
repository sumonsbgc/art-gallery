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
  onRedirectClick?: () => void;
};

const GalleryItem = ({
  authorImg,
  authorName,
  authorId,
  likeCount,
  flagUrl,
  country
}: GalleryItemProp) => {
  return (
    <div className="gallery-item w-full md:max-w-[300px]">
      <div className="w-full relative h-[360px] cursor-pointer">
        {authorImg && (
          <Link href={`/artists/${authorId}/${authorName}`} className="w-full h-full relative">
            <Img src={authorImg} alt={authorName} layout />
          </Link>
        )}
      </div>
      <div className="gallery__content">
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

export default GalleryItem;
