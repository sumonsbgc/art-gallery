/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Swal from 'sweetalert2';

// components
import Wrapper from '@/components/layout/Wrapper';
import Layout from '@/components/layout';
import {
  // ArtCard,
  ComponentLoader,
  CountryFlag,
  Img,
  NoDataFound,
  // SocialList,
  Text,
  Title
} from '@/components/common';
// import { TabContent, TabFilterItem } from '@/components/ui/Tab';
// import { DatePicker, Select } from 'antd';
// const { RangePicker } = DatePicker;

// redux
// import { checkAuthUser } from '@/redux/selector/auth.selector';
// import { useAppDispatch } from '@/redux/hooks';
// import { openAuthModal } from '@/redux/features/auth/authSlice';

// types
import { PageProps } from '@/types/meta.type';
// import FollowWrapper from '@/components/RenderProps/Follow';
import { getActiveTab } from '@/redux/selector/tab.selector';
// import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { useGetCriticReviewByCriticIdQuery } from '@/redux/features/critic/criticApi';
// import { getReviewsByCriticId } from '@/redux/selector/review.selector';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MyReviewItem } from '@/redux/features/critic/critic.types';
import { CriticReviewItem, ExperiencesAward } from '@/components/dashboard/critic';
import { UserData } from '@/redux/features/auth/auth.types';
import { Skeleton } from 'antd';

// const tabs = [
//   {
//     title: 'Rate & Reviews',
//     id: 'rate-reviews'
//   },
//   {
//     title: 'Critic Info',
//     id: 'critics-info'
//   }
// ];

const CriticsDetails = ({ params }: { params: PageProps }) => {
  const param = params.slug;
  // const dispatch = useAppDispatch();
  const activatedTab = getActiveTab();
  const [page, setPage] = useState<number>(1);
  const [critic, setCritic] = useState<UserData>({} as UserData);
  const [showFull, setShowFull] = useState(false);
  const [reviews, setReviews] = useState<any>();
  // const [activeTab, setActiveTab] = useState<string>('rate-reviews');
  const [noData, setNoData] = useState<boolean>(false);

  const { isLoading, data, isSuccess } = useGetCriticReviewByCriticIdQuery(
    { critic_id: Number(param[0]), page: page },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const handleLoadMore = async () => {
    if (reviews?.next_page_url) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!isLoading && data?.data?.data?.length > 0) {
      setReviews(data?.data);
      setNoData(false);
    } else {
      setNoData(true);
    }

    if (isSuccess && data?.userDetail) {
      setCritic(data?.userDetail);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (activatedTab) {
      // setActiveTab(activatedTab);
    }
  }, [activatedTab]);

  return isLoading ? (
    <ComponentLoader />
  ) : (
    <Layout headerBottomBorder>
      <div className="w-full py-10">
        <Wrapper>
          <div className="w-full">
            <div className="w-full md:flex md:gap-3 border-b border-[#000000]/10 pb-5">
              <div className="w-full md:w-[172px] flex justify-center md:justify-start">
                {!isLoading ? (
                  <Img
                    src={critic?.image_path || '/assets/icons/user.svg'}
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
              </div>
              <div className="w-full md:w-[calc(100%-172px)]">
                <div className="w-full mt-5 lg:flex md:justify-between">
                  <div className="w-full lg:w-8/12">
                    <div className="w-full">
                      <Title
                        content={param[1] && decodeURIComponent(String(param[1]))}
                        className="!text-3xl my-3 capitalize"
                      />
                    </div>
                    <div className="w-full">
                      {critic?.country?.country_badges && (
                        <CountryFlag
                          country={critic?.country?.country_name}
                          flagUrl={critic?.country?.country_badges}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 mt-4 md:mt-0 flex md:justify-end gap-4">
                    <ExperiencesAward user={critic} />
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
                      ? critic?.about
                      : critic?.about?.length > 588
                      ? `${critic?.about.substring(0, 588)}...`
                      : critic?.about}
                    {critic?.about?.length > 588 ? (
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
              {noData && <NoDataFound content="No ArtWork found for this artist " />}
              {!isLoading && !noData && reviews?.data?.length > 0 && (
                <>
                  <section className="w-full grid grid-cols-1 md:flex md:justify-between md:items-center mb-4">
                    <p className="text-gray6 text-[18px] font-medium min-w-[200px] mb-4 md:mb-0">
                      Rate & Review Given - {reviews?.total}
                    </p>
                    <div className="w-full flex items-center justify-between md:justify-end gap-4 sm:gap-[10px]"></div>
                  </section>

                  <InfiniteScroll
                    dataLength={reviews?.data?.length}
                    next={handleLoadMore}
                    hasMore={reviews?.data?.length < reviews?.total}
                    loader={
                      <div className="flex justify-center my-4">
                        <span className="page-loader" />
                      </div>
                    }
                  >
                    {reviews?.data?.map((review: MyReviewItem) => (
                      <CriticReviewItem key={review.itemDetail?.item_id} review={review} />
                    ))}
                  </InfiniteScroll>
                </>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default CriticsDetails;
