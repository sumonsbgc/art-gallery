/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

// ant design
import { Select as AntSelect, Button } from 'antd';

// components
import Select from '@/components/checkout/Select';
import { SectionTitle, Text } from '@/components/common';
// import { ArtFilterModal } from '@/components/common/Modals';
import { RatingOption } from '@/components/common/Form/RatingOptions';
import BASlider from '@/components/common/Form/BASlider';
import Wrapper from '@/components/layout/Wrapper';

// hooks
import useFilters from '@/hooks/useFilters';

// redux
import { useGetArtsQuery } from '@/redux/features/arts/artsApi';

// types
import { ArtItem } from '@/types/art';

// utils
import { getTotalItems, moneyFormat } from '@/utils';

type SearchFilterProp = {
  setArts: Dispatch<SetStateAction<ArtItem[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setTotalArtsCount?: Dispatch<SetStateAction<number>>;
};

export type QueryParamsType = {
  category_id: string;
  size_id: string;
  material_id: string;
  medium_id: string;
  subject_id: string;
  rate: string;
  minimum_price: number;
  maximum_price: number;
  sort_by: string;
};

const SearchFilter = ({ setArts, setIsLoading, setTotalArtsCount }: SearchFilterProp) => {
  const { filters } = useFilters();
  const param = useSearchParams();

  const pathname = usePathname().replace(/\//g, '');
  const path = pathname.trimStart().replaceAll('-', ' ');
  const [totalItems, setTotalItems] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [params, setParams] = useState<QueryParamsType>({
    // search: '',
    category_id: '',
    size_id: '',
    material_id: '',
    medium_id: '',
    subject_id: '',
    rate: '',
    minimum_price: 0,
    maximum_price: 100000,
    sort_by: ''
  });

  console.log(openFilter);

  const { data, isSuccess, isLoading, isError, error } = useGetArtsQuery(
    { ...params },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams) => ({ ...prevParams, [e.target.name]: e.target.value }));
  };

  const onRateChange = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, ['rate']: value }));
  };

  const onPriceHandler = (value: number[]) => {
    setParams((prevParams) => ({
      ...prevParams,
      ['minimum_price']: Number(value[0]),
      ['maximum_price']: Number(value[1])
    }));
  };

  const handleFilter = (info: boolean) => {
    setOpenFilter(info);
  };

  useEffect(() => {
    const catId = param.get('categories') || '';
    const search = param.get('search') || '';

    setParams((prevParams) => ({ ...prevParams, ['category_id']: String(catId) }));
    setParams((prevParams) => ({ ...prevParams, ['search']: String(search) }));
  }, [param]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setTotalItems(data?.data?.data?.length);
      setTotalArtsCount?.(data?.data?.total || 0);
      setArts(data?.data?.data);
    }

    if (isError) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Sorry! There Is Something Wrong',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [data, isSuccess, isError]);

  return (
    <section className="w-full">
      <div className="w-full xl:hidden">
        <Wrapper>
          <div className="w-full">
            <div className="w-full flex justify-content-between mt-4">
              <div className="w-full flex justify-start">
                <SectionTitle content={path} className="!text-2xl !font-semibold !capitalize" />
              </div>
              <div className="w-full flex justify-end">
                <Text>{getTotalItems(totalItems)}</Text>
              </div>
            </div>
            <div className="w-full flex justify-content-between mt-4">
              <div className="w-full flex justify-start">
                <div className="flex items-center relative">
                  {/* <Icon name="sorting" className="absolute left-2 z-10" /> */}
                  <Select
                    label="Sort by"
                    name="sort_by"
                    option={[
                      { value: 'default', label: 'Default' },
                      { value: 'popular', label: 'Most Popular' },
                      { value: 'low_to_high', label: 'Low to High' },
                      { value: 'high_to_low', label: 'High to Low' }
                    ]}
                    value={params?.sort_by}
                    onChange={onFilterChange}
                    className="pl-8 px-4 !py-1 bg-white focus:outline-none text-sm !w-[160px] !h-[32px] !min-h-0"
                    wrapperClass="!min-h-0"
                  />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-black text-white px-6 py-1"
                  onClick={() => handleFilter(true)}
                >
                  Filter (07)
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      <div className="search-filter-section hidden xl:block">
        <Wrapper>
          <div className="flex items-center gap-10">
            <div className="page-info flex-shrink-0">
              <SectionTitle content={path} className="!text-2xl !font-semibold !capitalize" />
              <Text>{!isLoading && isSuccess && getTotalItems(totalItems)}</Text>
            </div>
            <div className="flex justify-between items-center w-full">
              <ul className="flex items-center gap-1">
                <li className="mr-3">
                  <Text>Filter by:</Text>
                </li>
                <li className="">
                  <Select
                    label="Category"
                    name="category_id"
                    option={filters?.cats}
                    value={params?.category_id}
                    onChange={onFilterChange}
                    className="!px-4 !py-1 bg-white focus:outline-none text-sm !w-[105px] !h-[32px] !min-h-0"
                    wrapperClass="!min-h-0"
                  />
                </li>
                <li className="">
                  <Select
                    label="Size"
                    name="size_id"
                    option={filters?.sizes}
                    value={params?.size_id}
                    onChange={onFilterChange}
                    className="!px-4 !py-1 bg-white focus:outline-none text-sm !w-[80px] !h-[32px] !min-h-0"
                    wrapperClass="!min-h-0"
                  />
                </li>
                <li className="">
                  <Select
                    label="Material"
                    name="material_id"
                    option={filters?.materials}
                    value={params?.material_id}
                    onChange={onFilterChange}
                    className="!px-4 !py-1 bg-white focus:outline-none text-sm !w-[105px] !h-[32px] !min-h-0"
                    wrapperClass="!min-h-0"
                  />
                </li>
                <li className="">
                  <Select
                    label="Medium"
                    name="medium_id"
                    option={filters?.mediums}
                    value={params?.medium_id}
                    onChange={onFilterChange}
                    className="!px-4 !py-1 bg-white focus:outline-none text-sm !w-[105px] !h-[32px] !min-h-0"
                    wrapperClass="!min-h-0"
                  />
                </li>
                <li className="">
                  <Select
                    label="Subject"
                    name="subject_id"
                    option={filters?.subjects}
                    value={params?.subject_id}
                    onChange={onFilterChange}
                    className="!px-4 !py-1 bg-white focus:outline-none text-sm !w-[105px] !h-[32px] !min-h-0"
                    wrapperClass="!min-h-0"
                  />
                </li>
                <li className="relative">
                  <input
                    placeholder="Price"
                    onMouseDown={() => setShowSlider(!showSlider)}
                    value={`${moneyFormat(
                      Number(params?.minimum_price),
                      true,
                      'USD',
                      0
                    )} - ${moneyFormat(Number(params?.maximum_price), true, 'USD', 0)}`}
                    className="!px-4 !py-1 bg-white text-sm !w-[150px] !h-[32px] !min-h-0 border border-stone-500 border-opacity-30 bg-transparent text-stone-500 font-normal rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                  {showSlider && (
                    <div className="flex flex-col rounded-md bg-white gap-4 py-5 px-8 justify-start items-center shadow-lg absolute right-0 top-10 z-50 w-[390px] h-[120px]">
                      <BASlider
                        dots={true}
                        min={0}
                        max={10000}
                        onChange={onPriceHandler}
                        value={[Number(params?.minimum_price), Number(params?.maximum_price)]}
                        range={true}
                        step={2000}
                      />
                      <Button
                        className="bg-orange absolute bottom-3 right-3 text-white rounded"
                        onClick={() => setShowSlider(false)}
                      >
                        Set
                      </Button>
                    </div>
                  )}
                </li>
                <li className="">
                  <AntSelect
                    placeholder="Rate"
                    onChange={(value) => onRateChange(value)}
                    options={[
                      RatingOption(0),
                      RatingOption(1),
                      RatingOption(2),
                      RatingOption(3),
                      RatingOption(4),
                      RatingOption(5)
                    ]}
                    className="w-[141px] h-[32px]"
                  />
                </li>
              </ul>
              <div className="flex items-center relative">
                {/* <Icon name="sorting" className="absolute left-2 z-10" /> */}
                <Select
                  label="Sort by"
                  name="sort_by"
                  option={[
                    { value: 'default', label: 'Default' },
                    { value: 'popular', label: 'Most Popular' },
                    { value: 'low_to_high', label: 'Low to High' },
                    { value: 'high_to_low', label: 'High to Low' }
                  ]}
                  value={params?.sort_by}
                  onChange={onFilterChange}
                  className="pl-8 px-4 !py-1 bg-white focus:outline-none text-sm !w-[160px] !h-[32px] !min-h-0"
                  wrapperClass="!min-h-0"
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      {/* <ArtFilterModal
        open={openFilter}
        filters={filters}
        params={params}
        onFilterChange={onFilterChange}
        onPriceHandler={onPriceHandler}
        onRateChange={onRateChange}
        onClose={() => handleFilter(false)}
      /> */}
    </section>
  );
};

export default SearchFilter;
