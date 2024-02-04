import Image from 'next/image';
import Link from 'next/link';

// components
import { Rating, Text, Title, Img } from '@/components/common';
import { Icon } from '@/components/ui';

// redux
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/hooks';

// utils
import { countLike, getReviewLabel } from '@/utils';

type GalleryItemProp = {
  authorImg: string;
  authorName: string;
  likeCount: number;
  flagUrl: string;
  country: string;
  artistId: number;
  artistAbout: string;
  totalReviews: number;
  totalFavorite?: number;
  rating: number;
};

export const HoverItem = ({
  name,
  artistId,
  onClick
}: {
  name: string;
  artistId: number;
  onClick: () => void;
}) => {
  return (
    <div className="artists-hover absolute w-full h-full justify-center items-center hover:bg-black/60 top-0 left-0">
      <Link
        href={`artists/${artistId}/${decodeURIComponent(name)}`}
        onClick={onClick}
        className="border border-white px-4 py-2 text-white text-xs"
      >
        View Profile
      </Link>
    </div>
  );
};

const ArtistsItem = ({
  authorImg,
  authorName,
  likeCount,
  flagUrl,
  country,
  artistId,
  artistAbout,
  totalReviews,
  totalFavorite,
  rating = 0
}: GalleryItemProp) => {
  const dispatch = useAppDispatch();

  return (
    <div className="gallery-item w-full">
      <Link
        href={`artists/${artistId}/${decodeURIComponent(authorName)}`}
        onClick={() => dispatch(toggleActiveTab({ activeTab: 'artist-info' }))}
        className="relative artists-view w-full h-[217px]"
      >
        <span className="h-[20px] px-2 py-3 bg-[#848484]/75 rounded-full flex justify-center items-center gap-1 absolute right-3 top-3 z-20">
          <Icon name={'heart-fill'} color="white" size="16" />
          <span className="text-white text-[12px] font-medium">
            {countLike(Number(totalFavorite))}
          </span>
        </span>
        <Img
          src={authorImg || ''}
          alt={authorName}
          layout
          width={220}
          height={217}
          className="!w-full !h-[217px]"
        />
        <HoverItem
          artistId={artistId}
          name={authorName}
          onClick={() => dispatch(toggleActiveTab({ activeTab: 'artist-info' }))}
        />
      </Link>
      <div className="gallery__content">
        <section className="flex justify-between sm:pt-5 pt-4">
          <Link href={`artists/${artistId}/${decodeURIComponent(authorName)}`}>
            <Title content={authorName} className="capitalize" />
          </Link>
          <div className="flex items-center">
            <span className="-mt-1 mr-1">
              <Rating rating={1} size={16} color="#F6D008" iconsCount={1} readOnly />
            </span>
            <span className="text-black text-sm font-medium">{Math.floor(rating)}/5</span>
          </div>
          {/* <Text className="text-orange !text-xs font-medium">{totalReviews || 0} Reviews</Text> */}
        </section>

        <section className="flex items-center justify-between mt-1 mb-2">
          <div className="flex gap-1 items-center">
            <Image src={flagUrl} alt={country} width="22" height="16" />
            <div className="flex items-center">
              <Icon name="user-plus" color="gray" size="18" />
              <span className="text-gray4 ml-1 text-sm font-medium">{countLike(likeCount)}</span>
            </div>
          </div>
          {/* <span className="font-light text-black text-sm">{country}</span> */}
          <Text className="text-orange !text-xs font-medium">
            {getReviewLabel(totalReviews || 0)}
          </Text>
        </section>

        <Text>
          {artistAbout?.length > 100 ? (
            <>
              {artistAbout?.slice(0, 100)}...
              <Link
                href={`/artists/${artistId}/${authorName}/#artist-info`}
                onClick={() => dispatch(toggleActiveTab({ activeTab: 'artist-info' }))}
                className="text-orange italic capitalize font-normal underline"
              >
                More
              </Link>
            </>
          ) : (
            artistAbout
          )}
        </Text>
      </div>
    </div>
  );
};

export default ArtistsItem;
