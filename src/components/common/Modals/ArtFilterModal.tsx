/* eslint-disable no-unused-vars */
'use client';

import { Select as AntSelect, Button } from 'antd';
import { FilterModal } from '@/components/ui';
import Select from '@/components/checkout/Select';
import { filtersType } from '@/types/meta.type';
import { useState } from 'react';
import { moneyFormat } from '@/utils';
import BASlider from '../Form/BASlider';
import { RatingOption } from '../Form/RatingOptions';

export type FilterCats = {
  hot_seller?: number;
  most_like?: number;
  most_review?: number;
  top_rated?: number;
  top_hundred?: number;
  highly_appreciate?: number;
  fast_move?: number;
};

export type QueryParamsType = {
  filter_options: FilterCats;
  size_id: number[];
  categories: number[];
  rates: number[];
  minimum_price: string;
  maximum_price: string;
  lastday: string;
  sort_by: string;
};

type PaymentModalProps = {
  open: boolean;
  onClose(): void;
  filters: filtersType;
  params: QueryParamsType;
  onResetFilter: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceHandler: (value: number[]) => void;
  onRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ArtFilterModal = ({
  open,
  onClose,
  filters,
  params,
  onResetFilter,
  onFilterChange,
  onPriceHandler,
  onPriceChange,
  onRateChange
}: PaymentModalProps) => {
  const [showMoreFilter, setShowMoreFilter] = useState<boolean>(false);

  return (
    <FilterModal open={open} onClose={onClose}>
      <div className="w-[350px] overflow-hidden">
        <div className="w-full flex justify-between p-4">
          <span className="text-black text-[16px] font-[400]">Filter by</span>
          <span
            className="text-gray text-[12px] font-[400] cursor-pointer"
            onClick={(e) => {
              onResetFilter(e);
            }}
          >
            Clear all
          </span>
        </div>
        <div className="w-full h-[550px] grid grid-cols-1 gap-3 overflow-y-scroll p-4">
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2">Price</h3>
            <div className="w-full p-2 border border-[#DCDFE0]">
              <div className="w-full flex justify-between px-0 mt-4 mb-2 gap-3">
                <p className="w-1/2 flex flex-col text-[14px] font-[500] text-black">
                  <label
                    className="text-[#9F8A8A] text-xs font-medium cursor-pointer"
                    htmlFor="minimum_price"
                  >
                    Min
                  </label>
                  <input
                    className="w-full border-black/30 border px-2 text-sm"
                    type="text"
                    name="minimum_price"
                    id="minimum_price"
                    value={params?.minimum_price}
                    onChange={onPriceChange}
                  />
                </p>
                <p className="w-1/2 flex flex-col text-[14px] font-[500] text-black">
                  <label
                    className="text-[#9F8A8A] text-xs font-medium cursor-pointer"
                    htmlFor="maximum_price"
                  >
                    Max
                  </label>
                  <input
                    className="w-full border-black/30 border px-2"
                    type="text"
                    name="maximum_price"
                    id="maximum_price"
                    value={params?.maximum_price}
                    onChange={onPriceChange}
                  />
                </p>
              </div>
              <div className="w-full flex justify-center">
                <BASlider
                  dots={false}
                  min={0}
                  max={100000}
                  onChange={onPriceHandler}
                  value={[Number(params?.minimum_price), Number(params?.maximum_price)]}
                  range={true}
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2">Sort By</h3>
            <div className="w-full flex flex-col">
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="sort_by"
                  className="sort-by"
                  checked={params?.sort_by === 'low_to_high_price'}
                  value="low_to_high_price"
                />{' '}
                Low to High Price
              </label>
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="sort_by"
                  className="sort-by"
                  checked={params?.sort_by === 'high_to_low_price'}
                  value="high_to_low_price"
                />{' '}
                High to Low Price
              </label>
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="sort_by"
                  className="sort-by"
                  checked={params?.sort_by === 'low_to_high_rating'}
                  value="low_to_high_rating"
                />{' '}
                Low to High Rating
              </label>
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="sort_by"
                  className="sort-by"
                  checked={params?.sort_by === 'high_to_low_rating'}
                  value="high_to_low_rating"
                />{' '}
                High to Low Rating
              </label>
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="lastday"
                  className="sort-by"
                  checked={params?.lastday === '10'}
                  value="10"
                />{' '}
                Last 10 Days
              </label>
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="lastday"
                  className="sort-by"
                  checked={params?.lastday === '30'}
                  value="30"
                />{' '}
                Last 30 Days
              </label>
              <label className="sort-by-label">
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  name="lastday"
                  className="sort-by"
                  checked={params?.lastday === '60'}
                  value="60"
                />{' '}
                Last 60 Days
              </label>
            </div>
          </div>
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2">Category</h3>
            <div className="w-full flex flex-col">
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="highly_appreciate"
                  onChange={onFilterChange}
                  checked={Boolean(params?.filter_options?.highly_appreciate)}
                />{' '}
                Highly Appreciated
              </label>
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="hot_seller"
                  checked={Boolean(params?.filter_options?.hot_seller)}
                  onChange={onFilterChange}
                />{' '}
                Hot Seller
              </label>
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="most_like"
                  onChange={onFilterChange}
                  checked={Boolean(params?.filter_options?.most_like)}
                />{' '}
                Most Liked
              </label>
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="most_review"
                  checked={Boolean(params?.filter_options?.most_review)}
                  onChange={onFilterChange}
                />{' '}
                Most Reviewed
              </label>
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="fast_move"
                  checked={Boolean(params?.filter_options?.fast_move)}
                  onChange={onFilterChange}
                />{' '}
                Fast Movers
              </label>
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="top_hundred"
                  checked={Boolean(params?.filter_options?.top_hundred)}
                  onChange={onFilterChange}
                />{' '}
                Top 100
              </label>
              <label className="category-label cursor-pointer">
                <input
                  type="checkbox"
                  name="filter_options"
                  className="sort-by"
                  value="top_rated"
                  checked={Boolean(params?.filter_options?.top_rated)}
                  onChange={onFilterChange}
                />{' '}
                Top Rated
              </label>
            </div>
          </div>
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2">Rate</h3>
            <div className="w-full flex flex-col">
              <label className="w-full flex mb-[10px]">
                <input
                  type="checkbox"
                  name="rate[]"
                  className="category-by"
                  value={1}
                  checked={params?.rates?.includes(1)}
                  onChange={onRateChange}
                />
                <span className="-mt-1.5 ml-1 text-black">{RatingOption(1).label}</span>
              </label>
              <label className="w-full flex mb-[10px]">
                <input
                  type="checkbox"
                  name="rate[]"
                  className="category-by"
                  value={2}
                  checked={params?.rates?.includes(2)}
                  onChange={onRateChange}
                />
                <span className="-mt-1.5 ml-1 text-black">{RatingOption(2).label}</span>
              </label>
              <label className="w-full flex mb-[10px]">
                <input
                  type="checkbox"
                  name="rate[]"
                  className="category-by"
                  value={3}
                  checked={params?.rates?.includes(3)}
                  onChange={onRateChange}
                />
                <span className="-mt-1.5 ml-1 text-black">{RatingOption(3).label}</span>
              </label>
              <label className="w-full flex mb-[10px]">
                <input
                  type="checkbox"
                  name="rate[]"
                  className="category-by"
                  value={4}
                  checked={params?.rates?.includes(4)}
                  onChange={onRateChange}
                />
                <span className="-mt-1.5 ml-1 text-black">{RatingOption(4).label}</span>
              </label>
              <label className="w-full flex mb-[10px]">
                <input
                  type="checkbox"
                  name="rate[]"
                  className="category-by"
                  value={5}
                  checked={params?.rates?.includes(5)}
                  onChange={onRateChange}
                />
                <span className="-mt-1.5 ml-1 text-black">{RatingOption(5).label}</span>
              </label>
            </div>
          </div>

          {/* <div className={`overflow-hidden ${showMoreFilter ? 'h-auto translate-y-0' : 'h-0'}`}> */}
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2 capitalize">Category</h3>
            <div className="w-full flex flex-col">
              {filters?.cats.map((item: any, index: number) => (
                <label className="category-label cursor-pointer" key={index}>
                  <input
                    type="checkbox"
                    name="categories"
                    className="category-by"
                    value={item.value}
                    onChange={onFilterChange}
                    checked={params?.categories?.includes(item.value)}
                  />{' '}
                  {item.label}
                </label>
              ))}
            </div>
          </div>
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2">Size</h3>
            <div className="w-full flex flex-col">
              {filters?.sizes.map((item: any, index: number) => (
                <label className="category-label" key={index}>
                  <input
                    type="checkbox"
                    name="size_id"
                    className="category-by"
                    value={item.value}
                    onChange={onFilterChange}
                    checked={params?.size_id?.includes(item.value)}
                  />{' '}
                  {item.label}
                </label>
              ))}
            </div>
          </div>
          {/* </div> */}

          {/* <div className="flex justify-end w-full">
            <button className="text-orange" onClick={() => setShowMoreFilter(!showMoreFilter)}>Show More</button>
          </div> */}
        </div>
        <div className="w-full flex justify-center p-4 shadow-lg border-t border-black/10">
          <button
            onClick={onClose}
            className="w-full h-[42px] flex justify-center items-center text-center gap-6 bg-orange cursor-pointer"
          >
            <span className="inline-flex text-[#fff] text-[12px] font-[700] uppercase justify-center items-center">
              Apply
            </span>
          </button>
        </div>
      </div>
    </FilterModal>
  );
};

export default ArtFilterModal;
