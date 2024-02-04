/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

// and design
import type { PaginationProps } from 'antd';
import { Pagination as PaginationAntD } from 'antd';

// swiper
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// components
import PriceBreakDown from './PriceBreakDown';
import { TabFilterItem } from '@/components/ui/Tab/TabFilter';
import { TabContent } from '@/components/ui/Tab/TabContent';
import { AuthModal, CustomerReviewModal } from '@/components/common/Modals';
import { NoDataFound, Rating, Title, Img, Button } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';

// hooks
import useWindowSize from '@/hooks/useWindowSize';

// redux
import { getUserInfo } from '@/redux/selector/auth.selector';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewRatingApi';
import { getActiveTab } from '@/redux/selector/tab.selector';
import { useAppDispatch } from '@/redux/hooks';
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { getAllReviews } from '@/redux/selector/review.selector';

// data
import { artDetailFilters } from '@/data/tab';

// utils
import { getUniqueId } from '@/utils';

// types
import { Reviews } from '@/redux/features/review/reviewRating.types';

const DetailTabs = ({
  item_id,
  aboutArt,
  detailsDimension,
  vendorId,
  artistId
}: {
  item_id: number;
  aboutArt: string;
  detailsDimension: string;
  vendorId: number;
  artistId: number;
}) => {
  const size = useWindowSize();

  const swiperRef = useRef<SwiperRef | null>(null);
  const dispatch = useAppDispatch();
  const userInfo = getUserInfo();
  const activatedTab = getActiveTab();
  const { data: reviews, total: totalReview } = getAllReviews();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const { isError, error, refetch } = useGetAllReviewsQuery(
    { item_id, page, limit },
    { refetchOnMountOrArgChange: true }
  );
  const [activeTab, setActiveTab] = useState<string>('about-art');
  const [childActiveTab, setChildActiveTab] = useState<string>('all-reviews');
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [openCustomerReviewModal, setOpenCustomerReviewModal] = useState<boolean>(false);
  const criticReview = reviews?.filter((review: Reviews) => review?.type === 'critic');

  const reviewFilters = [
    {
      title: 'All Review',
      id: 'all-reviews',
      data: reviews
    },
    {
      title: 'Only Critics',
      id: 'only-critic',
      data: criticReview
    }
  ];

  const reviewHandler = () => {
    if (
      userInfo.user_type === 'critic' ||
      userInfo.user_type === 'customer' ||
      userInfo.user_type === 'artist'
    ) {
      setOpenCustomerReviewModal(true);
    } else {
      setOpenAuthModal(true);
    }
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (size?.width !== undefined && size?.width > 0) {
      const width = size?.width || 0;
      setLimit(width <= 640 ? 1 : 2);
    }
  }, [size]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        // @ts-ignore
        text: error?.data?.message || 'Something Error',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isError]);

  useEffect(() => {
    if (activatedTab) {
      setActiveTab(activatedTab);
      if (swiperRef.current) {
        const index = artDetailFilters.findIndex((item) => item.id === activatedTab);
        swiperRef.current.swiper.slideTo(index);
      }
    }
  }, [activatedTab]);

  const tab1Content = (
    <p className="text-justify italic text-[#525252] text-base font-normal">{aboutArt}</p>
  );

  const tab2Content = (
    <>
      <div className="flex justify-between flex-col sm:flex-row sm:gap-0 gap-2">
        <ul className="flex items-center order-1 sm:order-none">
          {reviewFilters?.map((filter) => (
            <TabFilterItem
              key={filter?.title}
              title={filter?.title}
              activeTab={childActiveTab}
              id={filter?.id}
              activeClass="!bg-orange"
              className="!py-[6px] !px-6"
              activeHandler={() => setChildActiveTab(filter?.id)}
            />
          ))}
        </ul>
        {/* {user: {userInfo?.id}, custodian: {vendorId}, artist: {artistId}} */}
        {userInfo?.id !== vendorId && userInfo?.id !== artistId ? (
          <Button
            className="!bg-black !py-1 !px-5 text-white !text-sm uppercase"
            onClick={reviewHandler}
          >
            write rate & review
          </Button>
        ) : null}
      </div>
      <div className="py-4">
        {reviewFilters?.map((filter) => (
          <TabContent key={filter?.id} id={filter?.id} activeTab={childActiveTab}>
            {Array.isArray(filter?.data) && filter?.data?.length > 0 ? (
              <>
                {filter?.data?.map((review: Reviews) => (
                  <div
                    className="bg-white gap-4 px-7 py-5 rounded-md border-black/10 border mb-4"
                    key={review?.id}
                  >
                    <div className="bg-white flex items-start gap-4">
                      {/* {review?.userDetail?.image_path && ( */}
                      {review?.type === 'critic' ? (
                        <Link
                          onClick={() => dispatch(toggleActiveTab({ activeTab: 'rate-reviews' }))}
                          href={`/critics/${review?.userDetail?.id}/${review?.userDetail?.name}`}
                        >
                          <Img
                            src={review?.userDetail?.image_path || '/assets/icons/user.svg'}
                            alt={review?.userDetail?.name}
                            width={55}
                            height={55}
                            className="rounded-full flex-shrink-0 w-[55px] h-[55px]"
                          />
                        </Link>
                      ) : (
                        <Img
                          src={review?.userDetail?.image_path || '/assets/icons/user.svg'}
                          alt={review?.userDetail?.name}
                          width={55}
                          height={55}
                          className="rounded-full flex-shrink-0 w-[55px] h-[55px]"
                        />
                      )}
                      {/* )} */}
                      <div className="w-full">
                        <div className="flex justify-between">
                          <div className="flex gap-3">
                            {review?.type === 'critic' ? (
                              <Link
                                onClick={() =>
                                  dispatch(toggleActiveTab({ activeTab: 'rate-reviews' }))
                                }
                                href={`/critics/${review?.userDetail?.id}/${review?.userDetail?.name}`}
                              >
                                <Title
                                  content={review?.userDetail?.name}
                                  className="text-base font-medium uppercase text-black"
                                />
                              </Link>
                            ) : (
                              <Title
                                content={review?.userDetail?.name}
                                className="text-base font-medium uppercase text-black"
                              />
                            )}
                            <span
                              className={`text-xs font-medium text-white py-[2px] px-[10px] rounded-xl items-center capitalize ${
                                review?.type === 'customer' || review?.type?.length === 0
                                  ? 'hidden'
                                  : 'flex'
                              } ${review?.type === 'critic' ? 'bg-orange' : 'bg-black'}`}
                            >
                              {review?.type}
                            </span>
                          </div>
                          <Rating
                            rating={Number(review?.rating)}
                            color="#FFC600"
                            size={16}
                            readOnly
                          />
                        </div>
                        <span className="text-[#4f4f4f] text-sm font-normal capitalize">
                          {review?.userDetail?.country?.country_name}
                        </span>
                        <p className="mt-4" style={{ overflowWrap: 'anywhere' }}>
                          {review?.review}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex w-full justify-center">
                  <PaginationAntD
                    defaultCurrent={page}
                    onChange={onChange}
                    total={totalReview}
                    pageSize={limit || 2}
                  />
                </div>
              </>
            ) : (
              <NoDataFound content="No reviews found" className="mt-16" noBorder />
            )}
          </TabContent>
        ))}
      </div>
    </>
  );

  const tab3Content = (
    <>
      {detailsDimension}
      {/* <p>Print: Giclee on Fine Art Paper</p>
          <p>Size: 20.3 W x 25.4 H x 0.3 D cm</p>
          <p>Size with Frame: 25.25 W x 30.25 H x 3 D cm</p>
          <p>Frame: White</p>
          <p>Ready to Hang: Yes</p>
          <p>Packaging: Ships in a Box</p> */}
    </>
  );

  const tab4Content = <>{item_id && <PriceBreakDown itemId={item_id} />}</>;

  const tab5Content = (
    <>
      <p>
        Delivery Time: Typically 5-7 business days for domestic shipments, 10-14 business days for
        international shipments.
      </p>
      <p>
        Returns: All Open Edition prints are final sale items and ineligible for returns.Visit our
        help section for more information.
      </p>
      <p>Delivery Cost: Calculated at checkout.</p>
      <p>Handling: Ships in a box. Art prints are packaged and shipped by our printing partner.</p>
      <p>Ships From: Printing facility in California.</p>
    </>
  );

  return (
    <section className="artDetailsTab pt-36 pb-4 sm:pb-16 gradient" id="details-tab">
      <Wrapper>
        <div className="tab-container">
          <div className="relative">
            <ul className="swiper-pagination tab-filter !left-0 !-top-[80px] h-[58px]">
              {artDetailFilters?.map((filter) => (
                <TabFilterItem
                  key={filter?.id + getUniqueId()}
                  title={filter?.title}
                  activeTab={activeTab}
                  id={filter?.id}
                  activeHandler={() => {
                    setActiveTab(filter?.id);
                    dispatch(toggleActiveTab({ activeTab: filter?.id }));
                  }}
                  className="swiper-custom-bullet h-[58px]"
                />
              ))}
            </ul>

            {/* tab content with scroll for desktop only */}
            <div className="hidden md:block">
              <Swiper
                ref={swiperRef}
                autoHeight={true}
                direction="vertical"
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true
                }}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination',
                  type: 'custom',
                  bulletClass: 'swiper-custom-bullet'
                }}
                onSlideChange={(swiper) => {
                  const _activeTab = artDetailFilters[swiper.activeIndex]?.id;
                  setActiveTab(_activeTab);
                  dispatch(toggleActiveTab({ activeTab: _activeTab }));
                }}
                modules={[Mousewheel, Pagination]}
                // className="max-h-[400px] sm:max-h-[550px] overflow-y-auto"
                // className={`max-h-[${
                //   activeTab === 'review-rates' ? reviewRef?.current?.clientHeight : 550
                // }px] overflow-y-auto`}
              >
                <SwiperSlide>{tab1Content}</SwiperSlide>
                <SwiperSlide>{tab2Content}</SwiperSlide>
                <SwiperSlide>{tab3Content}</SwiperSlide>
                <SwiperSlide>{tab4Content}</SwiperSlide>
                <SwiperSlide>{tab5Content}</SwiperSlide>
              </Swiper>
            </div>

            {/* tab content for mobile only */}
            <div className="md:hidden">
              {artDetailFilters?.map((filter) => (
                <TabContent key={filter?.id} id={filter?.id} activeTab={activeTab}>
                  {filter?.id === 'about-art' && tab1Content}
                  {filter?.id === 'review-rates' && tab2Content}
                  {filter?.id === 'details-dimensions' && tab3Content}
                  {filter?.id === 'price-breakdown' && tab4Content}
                  {filter?.id === 'shipping-returns' && tab5Content}
                </TabContent>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>

      <CustomerReviewModal
        item_id={item_id}
        open={openCustomerReviewModal}
        onClose={() => {
          setOpenCustomerReviewModal(false);
          refetch();
        }}
      />
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </section>
  );
};

export default DetailTabs;
