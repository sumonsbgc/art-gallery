import { Img, Text, Title } from '@/components/common';
import { Icon } from '@/components/ui';
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ArtDetailProps = {
  title: string;
  authorName: string;
  authorImg: string;
  country: string;
  flagUrl: string;
  artistId: number;
  aboutArt: string;
  fb_url: string;
  twitter_url: string;
  insta_url: string;
  youtube_url: string;
};

const ArtDetail = ({
  title,
  aboutArt,
  authorName,
  authorImg,
  artistId,
  country,
  flagUrl,
  fb_url,
  twitter_url,
  insta_url,
  youtube_url
}: ArtDetailProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    if (window && typeof window !== 'undefined') {
      router.push(`${window.location.href}/#details-tab`);
    }
    dispatch(toggleActiveTab({ activeTab: 'about-art' }));
  };

  return (
    <div className="mt-4 mb-8 sm:mb-6">
      <p className="product-title text-xl sm:text-[30px] font-normal text-[#4f4f4f] capitalize">
        {title}
      </p>
      {aboutArt && (
        <div className="">
          <p
            dangerouslySetInnerHTML={{
              __html: `${aboutArt.slice(0, 150)}...`
            }}
            className="mt-2 text-gray4 text-sm font-normal inline"
          />
          <button
            type="button"
            onClick={clickHandler}
            className="text-orange inline text-sm capitalize font-normal underline"
          >
            More
          </button>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <div className="flex gap-3 items-center">
          {authorImg ? (
            <Link
              href={`/artists/${artistId}/${authorName}`}
              onClick={() => dispatch(toggleActiveTab({ activeTab: 'arts' }))}
              className="flex items-center gap-2"
            >
              <Img
                src={authorImg}
                width={56}
                height={56}
                alt={authorName}
                className="w-14 h-14 rounded-full"
              />
            </Link>
          ) : (
            <Link
              href={`/artists/${artistId}/${authorName}`}
              onClick={() => dispatch(toggleActiveTab({ activeTab: 'arts' }))}
              className="flex items-center gap-2"
            >
              <Img
                src={'/assets/icons/user.svg'}
                width={56}
                height={56}
                alt={authorName}
                className="w-14 h-14 rounded-full"
              />
            </Link>
          )}
          <div className="flex flex-col gap-1">
            <Link
              href={`/artists/${artistId}/${authorName}`}
              onClick={() => dispatch(toggleActiveTab({ activeTab: 'arts' }))}
              className="flex items-center gap-2"
            >
              <Title content={authorName} className="!text-sm capitalize italic underline" />
            </Link>
            {flagUrl && (
              <Img src={flagUrl} alt={country} width={22} height={16} className="w-[22px] h-4" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Text className="!text-xs text-gray4">
            {authorName && authorName.split(' ')[0]} Social Media
          </Text>
          <ul className="flex gap-[10px]">
            <li className="w-6 h-6">
              <Link
                href={fb_url}
                className="bg-orange/10 p-1 flex w-full justify-center items-center"
              >
                <Icon name="facebook" color="orange" size="16" />
              </Link>
            </li>
            <li className="w-6 h-6">
              <Link
                href={insta_url}
                className="bg-orange/10 p-1 flex w-full justify-center items-center"
              >
                <Icon name="instagram" color="orange" size="16" />
              </Link>
            </li>
            <li className="w-6 h-6">
              <Link
                href={twitter_url}
                className="bg-orange/10 p-1 flex w-full justify-center items-center"
              >
                <Icon name="twitter" color="orange" size="16" />
              </Link>
            </li>
            <li className="w-6 h-6">
              <Link
                href={youtube_url}
                className="bg-orange/10 p-1 flex w-full justify-center items-center"
              >
                <Icon name="youtube-line" color="orange" size="16" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtDetail;
