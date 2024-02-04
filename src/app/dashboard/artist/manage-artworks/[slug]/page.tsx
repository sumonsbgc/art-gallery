'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import PriceBreakDown from '@/components/Sections/Details/PriceBreakDown';
import Select from '@/components/checkout/Select';
import { Button, Title, ComponentLoader } from '@/components/common';
import BASwitch from '@/components/common/Form/BASwitch';
import { ArtInfo, ArtRating, ArtSidebarInfo } from '@/components/dashboard/artist';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import { TabContent, TabFilterItem } from '@/components/ui/Tab';

// redux
import { useGetArtQuery, useUpdateArtSaleStatusMutation } from '@/redux/features/arts/artsApi';

// types
import { ArtItem } from '@/types/art';
import { PageProps } from '@/types/meta.type';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewRatingApi';

const ArtworkDetail = ({ params }: { params: PageProps }) => {
  const router = useRouter();

  // state
  const [totalReview, setTotalReview] = useState(0);
  const [saleStatus, setSaleStatus] = useState<boolean>();
  const [art, setArt] = useState<ArtItem>({} as ArtItem);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const tabs = [
    {
      title: 'Art Details',
      id: 'art-details'
    },
    {
      title: `Reviews (${totalReview})`,
      id: 'reviews'
    }
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);

  // redux query/mutation
  const [updateStatus] = useUpdateArtSaleStatusMutation();
  const {
    data: artDetail,
    isLoading,
    isSuccess
  } = useGetArtQuery(params?.slug, {
    refetchOnMountOrArgChange: true
  });
  const {
    data: allReviews,
    isLoading: isReviewLoading,
    isSuccess: isReviewSuccess,
    isError
  } = useGetAllReviewsQuery(
    { item_id: art?.item_id || 0, page },
    { refetchOnMountOrArgChange: true }
  );

  const updateSaleStatusHandler = (checked: boolean) => {
    if (
      !Boolean(art?.sale_status) &&
      Number(art?.mainOwner?.id) !== Number(art?.current_owner_id?.id)
    ) {
      return;
    }

    setSaleStatus(checked);

    const formData = new FormData();
    formData.append('id', String(art?.item_id));
    formData.append('sale_status', String(checked ? 1 : 0));

    updateStatus(formData);
  };

  useEffect(() => {
    if (!isLoading && isSuccess && artDetail?.status === 'success') {
      setArt(artDetail?.data);
    }
  }, [artDetail, isLoading, isSuccess]);

  useEffect(() => {
    if (!isReviewLoading && isReviewSuccess) {
      setReviews(allReviews?.data?.data);
      setTotalReview(allReviews?.data?.total);
    }
  }, [
    isReviewSuccess,
    isError,
    isReviewLoading,
    allReviews?.data?.data,
    allReviews?.data?.total,
    setTotalReview
  ]);

  return isLoading ? (
    <ComponentLoader />
  ) : (
    <Wrapper>
      <button
        className="bg-transparent border-none text-black flex gap-2"
        onClick={() => router.back()}
      >
        <Icon name="arrow-left" color="black" /> Back
      </button>

      <section className="flex gap-20 mt-8 lg:flex-row flex-col">
        <div className="lg:w-2/3 w-full">
          <div className="flex justify-between w-full border-b border-black/10 mb-6">
            <ul className="tab-filter">
              {tabs?.map((tab) => {
                return (
                  <TabFilterItem
                    key={tab?.id}
                    id={tab?.id}
                    title={tab?.title}
                    activeTab={activeTab}
                    activeHandler={() => setActiveTab(tab?.id)}
                    className="!py-[7px] !px-8 bg-gray3 font-normal text-base w-[150px]"
                    activeClass="!bg-black !text-white font-medium"
                  />
                );
              })}
            </ul>
            {activeTab === 'reviews' ? (
              <div className="w-[129px] !h-[32px] lg:flex hidden">
                <Select
                  label="All Reviews"
                  name="nane"
                  option={[]}
                  value=""
                  onChange={(e) => console.log(e.target.value)}
                  className="w-full !h-[32px] !min-h-0 pl-3 px-4 !py-1 bg-white focus:outline-none text-sm"
                  wrapperClass="!min-h-0"
                />
              </div>
            ) : (
              <ul className="tab-filter gap-2 lg:flex hidden">
                {/* <li><BASwitch onChange={updateSaleStatusHandler} checked={saleStatus || art?.sale_status} /></li> */}
                <li>
                  <BASwitch
                    onChange={updateSaleStatusHandler}
                    checked={Boolean(art?.sale_status)}
                  />
                </li>
                {/* <li>
                  <button
                    className="rounded-none h-8 px-4 py-[5px] font-medium text-sm border text-orange border-orange bg-transparent"
                    onClick={() => console.log(art?.item_id)}
                  >
                    Unpublish
                  </button>
                </li> */}
                <li>
                  <Button
                    className="rounded-none h-8 !px-4 !py-[5px] !text-sm border border-orange font-medium capitalize text-white"
                    onClick={() =>
                      router.push(`/dashboard/artist/manage-artworks/edit/${art?.item_slug}`)
                    }
                    disabled={
                      !Boolean(art?.sale_status) &&
                      art?.mainOwner?.id !== Number(art?.current_owner_id?.id)
                    }
                  >
                    Edit Art
                  </Button>
                </li>
              </ul>
            )}
          </div>
          <section className="w-full flex flex-col justify-between gap-4 my-4">
            {activeTab === 'reviews' ? (
              <div className="w-[129px] !h-[32px] flex lg:hidden">
                <Select
                  label="All Reviews"
                  name="nane"
                  option={[]}
                  value=""
                  onChange={(e) => console.log(e.target.value)}
                  className="w-full !h-[32px] !min-h-0 pl-3 px-4 !py-1 bg-white focus:outline-none text-sm"
                  wrapperClass="!min-h-0"
                />
              </div>
            ) : (
              <ul className="tab-filter gap-2 lg:hidden">
                {/* <li><BASwitch onChange={updateSaleStatusHandler} checked={saleStatus || art?.sale_status} /></li> */}
                <li>
                  <BASwitch onChange={updateSaleStatusHandler} checked={saleStatus || false} />
                </li>
                <li>
                  <button
                    className="rounded-none h-8 px-4 py-[5px] font-medium text-sm border text-orange border-orange bg-transparent"
                    onClick={() => console.log(art?.item_id)}
                  >
                    Unpublish
                  </button>
                </li>
                <li>
                  <Button
                    className="rounded-none h-8 !px-4 !py-[5px] !text-sm border border-orange font-medium capitalize text-white"
                    onClick={() =>
                      router.push(`/dashboard/artist/manage-artworks/edit/${art?.item_slug}`)
                    }
                  >
                    Edit Art
                  </Button>
                </li>
              </ul>
            )}
            <ArtSidebarInfo
              thumbnail={art?.image_path}
              avgReviews={art?.review_opinion ? 'Positive' : 'Negative'}
              avrRating={art?.total_avg_rating}
              criticRating={art?.avg_critic_rating}
              totalLikes={art?.total_favorite}
              className="lg:hidden flex"
            />

            <TabContent id="art-details" activeTab={activeTab}>
              <ArtInfo
                about={art?.item_desc}
                dimensions={art?.item_shortdesc}
                price={art?.regular_price}
                title={art?.item_name}
                size={art?.size_id?.name}
              />
            </TabContent>
            <TabContent id="reviews" activeTab={activeTab}>
              {reviews?.length > 0 && (
                <ArtRating
                  reviews={reviews}
                  totalReview={totalReview}
                  page={page}
                  setPage={setPage}
                  limit={allReviews?.data?.per_page || 10}
                />
              )}
            </TabContent>
          </section>
        </div>
        <ArtSidebarInfo
          thumbnail={art?.image_path}
          avgReviews={'Positive'}
          avrRating={art?.avg_customer_rating}
          criticRating={art?.avg_critic_rating}
          totalLikes={art?.total_favorite}
          className="lg:flex lg:w-1/3 w-full hidden"
        />
      </section>

      <section>
        <Title content="Price Breakdown" className="uppercase" />
        <div className="border border-black/10 mt-1 py-5 px-4 rounded">
          {art?.item_id && <PriceBreakDown itemId={art?.item_id} />}
        </div>
      </section>
    </Wrapper>
  );
};

export default ArtworkDetail;
