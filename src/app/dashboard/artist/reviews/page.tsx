'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// ant design
import { Table, DatePicker, Space, Select } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

// components
import Wrapper from '@/components/layout/Wrapper';
// import Select from '@/components/checkout/Select';
import ArtistsReviewCard from '@/components/Artists/ArtistsReviewCard';

// redux
import {
  useGetAllArtAllRatingQuery,
  useGetArtistCardQuery
} from '@/redux/features/artist/artistApi';

// utils
import { reviewDate } from '@/utils';

// hooks
import useFilters from '@/hooks/useFilters';

const { RangePicker } = DatePicker;
type TablePaginationPosition = NonNullable<TablePaginationConfig['position']>[number];

interface DataType {
  key: string;
  artwork: string;
  review_date: string;
  reviewer_type: string;
  reviewer_name: string;
  rating: string;
  price: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Artwork',
    dataIndex: 'artwork'
  },
  {
    title: 'Review Date',
    dataIndex: 'review_date'
  },
  {
    title: 'Reviewer Type',
    dataIndex: 'reviewer_type',
    render: (text) => (
      <span
        className={`h-[22px] px-3 py-1 rounded-full text-center ${
          text === 'critic' ? 'bg-orange' : 'bg-black'
        }`}
      >
        <span className="text-white text-[12px] font-[400] capitalize -mt-2">{text}</span>
      </span>
    )
  },
  {
    // title: 'Reviewer Name',
    title: 'Review',
    dataIndex: 'reviewer_name'
  },
  {
    title: 'Rating',
    dataIndex: 'rating'
  },
  {
    title: 'Price',
    dataIndex: 'price'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (item) => (
      <Link
        href={`/dashboard/artist/reviews/${item.reviewID}?userType=${item.type}`}
        className="text-orange hover:text-orange underline"
      >
        See Review
      </Link>
    )
  }
];

const ArtistReviewPage = () => {
  const { filters } = useFilters();

  const bottom: TablePaginationPosition = 'bottomCenter';
  const [page, setPage] = useState(1);
  const [filterByRateReviewDate, setFilterByRateReviewDate] = useState<[string, string]>(['', '']);
  const [categoryId, setCategoryId] = useState<number>(0); // filters?.cats[0]?.id || 0
  const [search, setSearch] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [reviewList, setReviewList] = useState<any>([]);
  const { isLoading, data: artAllRating } = useGetAllArtAllRatingQuery(
    {
      page,
      start_date: filterByRateReviewDate[0],
      end_date: filterByRateReviewDate[1],
      category_id: categoryId === 0 ? '' : categoryId,
      search: search.trim()
    },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const { isLoading: isLoadingArtistCard, data: artistCard } = useGetArtistCardQuery({});

  const artistReviewCard = [
    {
      icon: 'critic-review',
      title: 'Critic Reviews',
      count: artistCard?.critic_review_total || 0,
      color: 'yellow2',
      borderColor: 'border-yellow2'
    },
    {
      icon: 'audience-review',
      title: 'Customer Reviews',
      count: artistCard?.customer_review_total || 0,
      color: 'blue',
      borderColor: 'border-blue'
    },
    {
      icon: 'heart-fill',
      title: 'Total Likes',
      count: artistCard?.total_likes || 0,
      color: 'red2',
      borderColor: 'border-red2'
    },
    {
      icon: 'user-plus',
      title: 'Total Followers',
      count: artistCard?.total_follower || 0,
      color: 'green2',
      borderColor: 'border-green2'
    }
  ];

  useEffect(() => {
    const allReviewList = artAllRating?.data?.data?.map((item: any) => ({
      key: item.item_id,
      artwork: item.items_detail.item_name,
      review_date: reviewDate(item.review_date),
      reviewer_type: item.type,
      reviewer_name: item.review,
      rating: `${item.rating}/5`,
      price: `$${item.items_detail.regular_price}`,
      action: { reviewID: item.id, type: item.type }
    }));

    setReviewList(allReviewList);
    setPageSize(artAllRating?.data?.per_page || 10);
    setTotalItem(artAllRating?.data?.total || 0);
    setPage(artAllRating?.data?.current_page || 1);
  }, [artAllRating]);

  return (
    <div className="w-full">
      <Wrapper>
        <div className="w-full">
          {/* info card */}
          <section className="w-full grid grid-cols-2 md:grid-cols-0 md:flex md:justify-between gap-4 mt-4 mb-8">
            {artistReviewCard.map((item, index) => (
              <ArtistsReviewCard
                key={index}
                loading={isLoadingArtistCard}
                icon={item.icon}
                title={item.title}
                count={item.count}
                color={item.color}
                className={`border-b-[8px] ${item.borderColor}`}
              />
            ))}
          </section>

          {/* search and filter */}
          <section className="w-full md:flex md:justify-between sm:gap-4 mt-4 mb-4">
            <div className="w-full sm:mb-2">
              <div className="w-full mb-2 sm:mb-0 sm:inline-flex rounded-md" role="group">
                <button className="w-6/12 sm:w-[103px] h-[38px] px-4 bg-orange border-orange border-t border-b border-l rounded-s-0 shadow-sm">
                  <span className="text-white !text-[14px] !font-[500]">All Reviews</span>
                </button>
                <button className="w-6/12 sm:w-[115px] h-[38px] px-4 bg-white border-black/10 border-t border-b border-r rounded-e-0 shadow-sm">
                  <span className="text-black !text-[14px] !font-[500]">Messages</span>
                </button>
              </div>
            </div>
            <div className="w-full sm:flex justify-start md:justify-end sm:gap-2">
              <div className="w-full sm:w-[247px] h-[32px] mb-2 sm:mb-0 flex">
                <div className="w-full sm:w-[173px] h-[32px] border-black/10 border-t border-b border-l">
                  <input
                    type="text"
                    placeholder="Search by art name"
                    name="name"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);

                      if (e.target.value === '') {
                        setSearch('');
                      }
                    }}
                    className="w-full h-8 input input-bordered bg-transparent rounded-none placeholder:text-[14px] placeholder:font-[400]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearch(searchText)}
                  className="w-[74px] h-8 bg-orange border-orange border-t border-b border-r flex justify-center items-center text-center text-[#fff] text-[14px] font-[400] cursor-pointer"
                >
                  Search
                </button>
              </div>
              <div className="w-full sm:w-[141px] mb-2 sm:mb-0">
                <Select
                  style={{ width: '100%' }}
                  placeholder="All Categories"
                  options={
                    [
                      {
                        label: 'All Categories',
                        value: 0
                      },
                      ...(filters?.cats || [])
                    ] || []
                  }
                  onChange={(value: number) => setCategoryId(value)}
                  className="w-[141px] h-[32px]"
                />
              </div>
              <div className="w-full sm:w-[239px] h-[32px]">
                <Space direction="vertical" size={12} className="w-full">
                  <RangePicker
                    onChange={(_, dateString) => setFilterByRateReviewDate(dateString)}
                    className="w-full focus:ring-black/10 focus:border-black/10 border-black/10 rounded-none"
                  />
                </Space>
              </div>
            </div>
          </section>

          {/* table */}
          <section className="w-full flex justify-between gap-4 my-4  overflow-y-hidden">
            <Table
              columns={columns}
              dataSource={reviewList}
              loading={isLoading}
              pagination={{
                position: [bottom],
                current: page,
                pageSize,
                total: totalItem,
                onChange: (page) => {
                  setPage(page);
                }
              }}
              bordered
              className="w-full rounded-none"
            />
          </section>
        </div>
      </Wrapper>
    </div>
  );
};

export default ArtistReviewPage;
