/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// components
import Wrapper from '@/components/layout/Wrapper';
import Layout from '@/components/layout';
import {
  ArtCard,
  ArtCardSkeletonList,
  CountryFlag,
  Img,
  NoDataFound,
  SocialList,
  Text,
  Title
} from '@/components/common';
// import { TabContent, TabFilterItem } from '@/components/ui/Tab';

// redux
import { useGetArtsByNativeArtistIdQuery } from '@/redux/features/arts/artsApi';
// useGetArtsByArtistIdQuery
import {
  useAddLikeMutation,
  useGetLikesQuery,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { getLikeArtIds } from '@/redux/selector/like.selector';
import { checkAuthUser, getUserInfo } from '@/redux/selector/auth.selector';
import { useAppDispatch } from '@/redux/hooks';
import { openAuthModal } from '@/redux/features/auth/authSlice';

// types
import { PageProps } from '@/types/meta.type';
import { ArtItem, CurrentOwnerType } from '@/types/art';
import FollowWrapper from '@/components/RenderProps/Follow';
import { getActiveTab } from '@/redux/selector/tab.selector';
// import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { Skeleton } from 'antd';

// const tabs = [
//   {
//     title: 'Arts',
//     id: 'arts'
//   },
//   {
//     title: 'Artist Info',
//     id: 'artist-info'
//   }
// ];

const ArtistDetails = ({ params }: { params: PageProps }) => {
  const param = params.slug;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthUser = checkAuthUser();
  const user = getUserInfo();
  const activatedTab = getActiveTab();
  const [showFull, setShowFull] = useState(false);
  const [arts, setArts] = useState<ArtItem[]>([] as ArtItem[]);
  const [artsTotal, setArtsTotal] = useState(0);
  const [artist, setArtist] = useState<CurrentOwnerType>({} as CurrentOwnerType);
  // const [activeTab, setActiveTab] = useState<string>('arts');
  const [noData, setNoData] = useState<boolean>(false);

  const { isLoading, data, isSuccess } = useGetArtsByNativeArtistIdQuery(
    { artist_id: Number(param[0]) },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  useEffect(() => {
    if (!isLoading && data?.data?.data?.length > 0) {
      setArts(data?.data?.data);
      setArtsTotal(data?.data?.total);
      setNoData(false);
    } else {
      setNoData(true);
    }

    console.log(data?.artistDetail, 'ARTIST DETAILS');
    if (isSuccess && data?.artistDetail) {
      setArtist(data?.artistDetail);
    }
  }, [isLoading, data]);

  useGetLikesQuery({});
  const likeArtIds = getLikeArtIds();

  const [addLike, { isError: isLikeError, error }] = useAddLikeMutation();
  const [removeLike, { isError: isRemoveError, error: removeError }] = useRemoveLikeMutation();

  const handleLikeClick = async (itemId: number, vendorId: number, artistId: number) => {
    try {
      if (isAuthUser) {
        if (user.id === vendorId || user.id === artistId) {
          return;
        }
        const isLiked = likeArtIds?.includes(itemId) || false;
        const formData = new FormData();
        formData.append('item_id', String(itemId));

        if (isLiked) {
          removeLike(formData);
        } else {
          addLike(formData);
        }
      } else {
        dispatch(openAuthModal());
      }
    } catch (error) {
      console.log('>>> handleLikeClick', error);
    }
  };

  useEffect(() => {
    if (isLikeError || isRemoveError) {
      console.log(error, removeError);
      Swal.fire({
        title: 'Error',
        text: 'Ooops! There Is Something Wrong!',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isLikeError, isRemoveError]);

  useEffect(() => {
    if (activatedTab) {
      console.log(activatedTab, 'ACTIVATED TAB');
      // setActiveTab(activatedTab);
    }
  }, [activatedTab]);

  return (
    <Layout headerBottomBorder>
      <div className="w-full py-10">
        <Wrapper>
          <div className="w-full">
            <div className="w-full md:flex md:gap-3 border-b border-[#000000]/10 pb-5">
              <div className="w-full md:w-[172px] flex justify-center md:justify-start">
                {/* {artist?.image_path && ( */}
                {!isLoading ? (
                  <Img
                    src={artist?.image_path || '/assets/icons/user.svg'}
                    alt={param[1] && String(param[1])}
                    width={150}
                    height={150}
                    className="rounded-full w-[150px] h-[150px]"
                  />
                ) : (
                  <Skeleton.Image
                    active
                    className="!w-[150px] !h-[150px] rounded-full overflow-hidden"
                  />
                )}
                {/* )} */}
              </div>
              <div className="w-full md:w-[calc(100%-172px)]">
                <div className="w-full mt-5 md:flex md:justify-between">
                  <div className="w-full">
                    <div className="w-full">
                      <Title
                        content={param[1] && decodeURIComponent(String(param[1]))}
                        className="!text-3xl my-3 capitalize"
                      />
                    </div>
                    <div className="w-full">
                      {artist?.country?.country_badges && (
                        <CountryFlag
                          country={artist?.country?.country_name}
                          flagUrl={artist?.country?.country_badges}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full mt-4 md:mt-0 flex md:justify-end gap-4">
                    <SocialList
                      color="orange"
                      size="24"
                      socialLinks={[
                        {
                          name: 'facebook',
                          href: String(artist?.facebook_url)
                        },
                        {
                          name: 'youtube',
                          href: String(artist?.gplus_url)
                        },
                        {
                          name: 'twitter',
                          href: String(artist?.twitter_url)
                        },
                        {
                          name: 'instagram',
                          href: String(artist?.instagram_url)
                        }
                      ]}
                    />
                    <div className="-mt-1 md:mt-5">
                      {user.id !== Number(artist?.id) && (
                        <FollowWrapper artistId={Number(artist?.id || param[0])}>
                          {(onFollowHandler, isFollowing, following) => (
                            <button
                              className="w-28 h-9 text-orange uppercase text-sm font-medium text-center border-2 border-orange"
                              onClick={onFollowHandler}
                            >
                              {isFollowing() || following ? 'Following' : 'Follow'}
                            </button>
                          )}
                        </FollowWrapper>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full mt-2">
                  {/* About */}
                  <Text
                    className={`w-full transition-transform ease-in-out duration-1000 ${
                      showFull ? 'translate-y-[2%]' : 'translate-y-0'
                    }`}
                  >
                    {showFull
                      ? artist?.about
                      : artist?.about?.length > 588
                      ? `${artist?.about.substring(0, 588)}...`
                      : artist?.about}
                    {artist?.about?.length > 588 ? (
                      <span
                        className="text-orange text-[16px] font-medium cursor-pointer"
                        onClick={() => setShowFull(!showFull)}
                      >
                        {showFull ? ' Less' : 'More'}
                      </span>
                    ) : (
                      ''
                    )}
                  </Text>
                  {/* About */}
                </div>
              </div>
            </div>
            <div className="w-full mt-5">
              <div className="w-full mb-5">
                <span className="text-[#8E8E8E] text-[18px] font-medium">
                  Artwork ({artsTotal})
                </span>
              </div>
              <div className="w-full">
                {<ArtCardSkeletonList isLoading={isLoading} />}
                {noData && !isLoading && arts?.length > 0 && (
                  <NoDataFound content="No ArtWork found for this artist " />
                )}
                {!noData && (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {arts?.map((art: ArtItem) => (
                      <ArtCard
                        key={art.item_id}
                        itemId={art.item_id}
                        slug={art.item_slug}
                        title={art.item_name}
                        imgUrl={art.image_path}
                        rating={art.total_avg_rating}
                        price={art?.price_detail?.final_price || art?.regular_price}
                        artistProfilePic={art?.mainOwner?.image_path}
                        artistName={art?.mainOwner?.name}
                        artistId={art?.mainOwner?.id}
                        vendorId={Number(art?.current_owner_id?.id)}
                        artistAbout={art?.mainOwner?.about}
                        priceStatus={art?.price_status}
                        itemLabel={art?.item_label_by_system}
                        priceFluctuation={art?.price_percent}
                        totalReviews={art?.total_review_product}
                        flagUrl={art?.mainOwner?.country?.country_badges}
                        country={art?.mainOwner?.country?.country_name}
                        onRedirectClick={() => router.push(`/arts/${art?.item_slug}`)}
                        like={likeArtIds?.includes(art?.item_id) || false}
                        totalFavorite={art?.total_favorite}
                        onLikeClick={handleLikeClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default ArtistDetails;
