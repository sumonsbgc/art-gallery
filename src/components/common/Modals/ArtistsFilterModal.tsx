/* eslint-disable no-unused-vars */
'use client';

import { Select as AntSelect, Button } from 'antd';
import { FilterModal, Icon } from '@/components/ui';
import Select from '@/components/checkout/Select';
import { ArtistsParamsType, filtersType } from '@/types/meta.type';
import { useState } from 'react';
import { moneyFormat } from '@/utils';
import BASlider from '../Form/BASlider';
import { Country } from '@/redux/features/auth/auth.types';

type CountrItem = {
  country_id: number;
  country_name: string;
};

type PaymentModalProps = {
  open: boolean;
  onClose(): void;
  params: ArtistsParamsType;
  countryList: any;
  sortByList: any;
  onResetFilter: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceHandler: (value: number[]) => void;
};

const ArtistFilterModal = ({
  open,
  onClose,
  countryList,
  sortByList,
  // filters,
  params,
  onResetFilter,
  onFilterChange,
  onPriceHandler
}: PaymentModalProps) => {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  return (
    <FilterModal open={open} onClose={onClose}>
      <div className="w-[350px] overflow-hidden">
        <div className="w-full flex justify-between p-4 border-b border-black/10">
          <span className="text-black text-[16px] font-[400]">Filter by</span>
          <span
            className="text-gray text-[12px] font-[400] cursor-pointer"
            onClick={(e) => {
              // onClose();
              onResetFilter(e);
            }}
          >
            Reset
          </span>
        </div>
        <div className="w-full grid grid-cols-1 gap-3 p-4 overflow-scroll">
          <div className="w-full">
            <h3 className="text-black text-[14px] font-[500] mb-2">Filter By Country</h3>
            <div className="w-full">
              <Select
                name="country_id"
                label="Filter by Country"
                onChange={onFilterChange}
                value={params.country_id}
                option={countryList?.data?.map((country: Country) => ({
                  label: country?.country_name,
                  value: String(country?.country_id)
                }))}
                className="px-4 !py-1 bg-white focus:outline-none text-sm w-full !h-[32px] !min-h-0"
                wrapperClass="!min-h-0"
              />
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-black text-[14px] font-[500] mb-2">Filter By Average Price</h3>
            <div className="w-full relative">
              <input
                placeholder="Price"
                onMouseDown={() => setShowSlider(!showSlider)}
                readOnly
                value={`${moneyFormat(
                  Number(params?.avg_art_price_min),
                  true,
                  'USD',
                  0
                )} - ${moneyFormat(Number(params?.avg_art_price_max), true, 'USD', 0)}`}
                className="px-4 !py-1 bg-white text-sm !w-full !h-[32px] !min-h-0 border border-stone-500 border-opacity-30 bg-transparent text-stone-500 font-normal rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
              {showSlider && (
                <div className="flex flex-col rounded-md bg-white border-black/10 border shadow-lg gap-4 py-4 px-4 justify-start items-center absolute right-0 top-10 z-50 w-full h-[120px]">
                  <BASlider
                    dots={true}
                    min={0}
                    max={1000000}
                    onChange={onPriceHandler}
                    value={[Number(params?.avg_art_price_min), Number(params?.avg_art_price_max)]}
                    range={true}
                    step={3000}
                    // showMarks
                  />
                  <Button
                    className="bg-orange absolute bottom-3 right-3 text-white rounded"
                    onClick={() => setShowSlider(false)}
                  >
                    Set
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-black text-[14px] font-[500] mb-2">Sort By</h3>
            <div className="w-full">
              <Select
                onChange={onFilterChange}
                label="Sort by"
                name="sort_by"
                value={params?.sort_by}
                option={sortByList?.map((sort: any) => ({
                  label: sort?.label,
                  value: sort?.value
                }))}
                className="px-4 !py-1 bg-white focus:outline-none text-sm w-[full] !h-[32px] !min-h-0"
                wrapperClass="!min-h-0"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex p-4">
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

export default ArtistFilterModal;
