/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

// ant design

// components
// import Select from '@/components/checkout/Select';
import { RatingOption } from '@/components/common/Form/RatingOptions';
import BASlider from '@/components/common/Form/BASlider';
import { ArtFilterModal } from '@/components/common/Modals';

// hooks
import useFilters from '@/hooks/useFilters';

// redux
import { useGetBestSellerArtsQuery } from '@/redux/features/arts/artsApi';

// types
import { ArtItem } from '@/types/art';
import { FilterCats, QueryParamsType } from '@/types/meta.type';

type FilterProp = {
  setArts: Dispatch<SetStateAction<ArtItem[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setTotalArtsCount?: Dispatch<SetStateAction<number>>;
  setArtParams?: Dispatch<SetStateAction<any>>;
  resetPage: () => void;
};

const BestSellerArtsFilter = ({
  setArts,
  setIsLoading,
  setTotalArtsCount,
  setArtParams,
  resetPage
}: FilterProp) => {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  const [showMoreFilter, setShowMoreFilter] = useState<boolean>(false);
  const { filters } = useFilters();
  const param = useSearchParams();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [params, setParams] = useState<QueryParamsType>({
    global_search: '',
    filter_options: {} as FilterCats,
    categories: [],
    size_id: [],
    rates: [],
    minimum_price: '0',
    maximum_price: '100000',
    lastday: '',
    sort_by: ''
  });

  const { data, isSuccess, isLoading, isError, error } = useGetBestSellerArtsQuery(
    {
      ...params,
      minimum_price: Number(params?.minimum_price || 0),
      maximum_price: Number(params?.maximum_price || 0)
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'filter_options') {
      console.log(e.target.name, [e.target.checked]);
      setParams((prevParams) => ({
        global_search: '',
        categories: [],
        size_id: [],
        rates: [],
        lastday: '',
        sort_by: '',
        minimum_price: prevParams.minimum_price,
        maximum_price: prevParams.maximum_price,
        ['filter_options']: {
          [e.target.value]: e.target.checked ? 1 : ''
        }
      }));
    }

    if (e.target.name === 'sort_by') {
      setParams((prevParams) => ({
        global_search: '',
        categories: [],
        size_id: [],
        rates: [],
        filter_options: {} as FilterCats,
        lastday: '',
        minimum_price: prevParams.minimum_price,
        maximum_price: prevParams.maximum_price,
        ['sort_by']: e.target.checked ? e.target.value : ''
      }));
    }

    if (e.target.name === 'lastday') {
      setParams((prevParams) => ({
        global_search: '',
        categories: [],
        filter_options: {} as FilterCats,
        size_id: [],
        rates: [],
        sort_by: '',
        minimum_price: prevParams.minimum_price,
        maximum_price: prevParams.maximum_price,
        ['lastday']: e.target.checked ? e.target.value : ''
      }));
    }

    if (e.target.name === 'size_id') {
      setParams((prevParams) => ({
        global_search: '',
        categories: [],
        filter_options: {} as FilterCats,
        rates: [],
        lastday: '',
        sort_by: '',
        minimum_price: prevParams.minimum_price,
        maximum_price: prevParams.maximum_price,
        ['size_id']: e.target.checked
          ? [...prevParams.size_id, Number(e.target.value)]
          : prevParams.size_id.filter((id) => id !== Number(e.target.value))
      }));
    }

    if (e.target.name === 'categories') {
      setParams((prevParams) => ({
        global_search: '',
        filter_options: {} as FilterCats,
        size_id: [],
        rates: [],
        lastday: '',
        sort_by: '',
        minimum_price: prevParams.minimum_price,
        maximum_price: prevParams.maximum_price,
        ['categories']: e.target.checked
          ? [...prevParams.categories, Number(e.target.value)]
          : prevParams.categories.filter((id) => id !== Number(e.target.value))
      }));
    }
  };

  const onRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams) => ({
      global_search: '',
      categories: [],
      size_id: [],
      filter_options: {} as FilterCats,
      lastday: '',
      sort_by: '',
      minimum_price: prevParams.minimum_price,
      maximum_price: prevParams.maximum_price,
      ['rates']: e.target.checked
        ? [...prevParams.rates, Number(e.target.value)]
        : prevParams.rates.filter((id) => id !== Number(e.target.value))
    }));
  };

  const onPriceHandler = (value: number[]) => {
    setParams((prevParams) => ({
      ...prevParams,
      ['minimum_price']: String(value[0]),
      ['maximum_price']: String(value[1])
    }));
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Negative Value Is Not Acceptable',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    } else if (e.target.value.match(/[^0-9]/g)) {
      Swal.fire({
        icon: 'warning',
        title: 'String Value Is Not Acceptable',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleFilter = (info: boolean) => {
    setOpenFilter(info);
  };

  useEffect(() => {
    const catIds = param.get('categories')?.split(',') || [];
    const isFindCats = catIds?.every((cat) => params?.categories?.includes(Number(cat)));

    const sizeIds = param.get('sizes')?.split(',') || [];
    const isFindSizes = sizeIds?.every((size) => params?.size_id?.includes(Number(size)));

    const rateIds = param.get('rates')?.split(',') || [];
    const isFindRates = rateIds?.every((rate) => params?.rates?.includes(Number(rate)));

    const search = param.get('search');
    const lastday = Number(param.get('lastday'));
    const sortby = param.get('sort_by');
    const minimum_price = Number(param.get('minimum_price')) || 0;
    const maximum_price = Number(param.get('maximum_price')) || '100000';

    if (!isFindCats) {
      const cats = catIds?.map((id) => Number(id));
      if (cats) {
        setParams((prevParams) => ({
          ...prevParams,
          ['categories']: [...cats]
        }));
      }
    }

    if (!isFindSizes) {
      const sizes = sizeIds?.map((id) => Number(id));
      if (sizes) {
        setParams((prevParams) => ({
          ...prevParams,
          ['size_id']: [...sizes]
        }));
      }
    }

    if (!isFindRates) {
      const rates = rateIds?.map((id) => Number(id));
      if (rates) {
        setParams((prevParams) => ({
          ...prevParams,
          ['rates']: [...rates]
        }));
      }
    }

    if (search && search !== String(params.global_search)) {
      setParams((prevParams) => ({ ...prevParams, ['global_search']: String(search) }));
    }

    if (lastday && lastday !== Number(params.lastday)) {
      setParams((prevParams) => ({ ...prevParams, ['lastday']: String(lastday) }));
    }

    if (sortby && sortby !== String(params.sort_by)) {
      setParams((prevParams) => ({ ...prevParams, ['sort_by']: String(sortby) }));
    }

    if (minimum_price && minimum_price !== Number(params.minimum_price)) {
      setParams((prevParams) => ({ ...prevParams, ['minimum_price']: String(minimum_price) }));
    }

    if (maximum_price && maximum_price !== Number(params.maximum_price)) {
      setParams((prevParams) => ({ ...prevParams, ['maximum_price']: String(maximum_price) }));
    }

    if (param.get('highly_appreciate') && !params.filter_options?.highly_appreciate) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['highly_appreciate']: 1
        }
      }));
    }

    if (param.get('hot_seller') && !params.filter_options?.hot_seller) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['hot_seller']: 1
        }
      }));
    }

    if (param.get('most_like') && !params.filter_options?.most_like) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['most_like']: 1
        }
      }));
    }

    if (param.get('most_review') && !params.filter_options?.most_review) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['most_review']: 1
        }
      }));
    }

    if (param.get('fast_move') && !params.filter_options?.fast_move) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['fast_move']: 1
        }
      }));
    }

    if (param.get('top_hundred') && !params.filter_options?.top_hundred) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['top_hundred']: 1
        }
      }));
    }

    if (param.get('top_rated') && !params.filter_options?.top_rated) {
      setParams((prevParams) => ({
        ...prevParams,
        ['filter_options']: {
          ...prevParams.filter_options,
          ['top_rated']: 1
        }
      }));
    }
  }, [param]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
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

  useEffect(() => {
    setArtParams?.(params);
    resetPage();
    console.log(params, 'CatID');
    const optionsParam = params?.filter_options
      ? Object.entries(params.filter_options).map(
          ([key, value]) => value === 1 && `${key}=${value}`
        )
      : [];

    const rateParams = `rates=${params?.rates.join(',')}`;
    const sizeParams = `sizes=${params?.size_id.join(',')}`;
    const catParams = `categories=${params?.categories.join(',')}`;

    const queryString = [
      ...optionsParam,
      params?.rates?.length > 0 && rateParams,
      params?.size_id?.length > 0 && sizeParams,
      params?.categories?.length > 0 && catParams,
      params?.lastday && `lastday=${params.lastday}`,
      params?.sort_by && `sort_by=${params.sort_by}`,
      params?.minimum_price && `minimum_price=${params.minimum_price}`,
      params?.maximum_price && `maximum_price=${params.maximum_price}`,
      params?.global_search !== '' && `search=${params.global_search}`
    ]
      .filter(Boolean)
      .join('&');

    router.push(pathname + '?' + queryString, { scroll: false });
  }, [params]);

  const onResetFilter = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setParams({
      global_search: '',
      filter_options: {} as FilterCats,
      categories: [],
      size_id: [],
      rates: [],
      minimum_price: '0',
      maximum_price: '100000',
      lastday: '',
      top_hundred: '',
      sort_by: ''
    } as QueryParamsType);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-end 2xl:hidden">
        <button className="bg-black text-white px-6 py-1" onClick={() => handleFilter(true)}>
          Filter ({data?.data?.total || 0})
        </button>
      </div>

      {/* <div className="w-full 2xl:hidden">
        <div className="w-full justify-content-between mt-4">
        </div>
      </div> */}

      <div className="hidden 2xl:block w-[275px] mt-8 md:mt-6 mb-10 shadow">
        <div className="w-full h-[56px] bg-orange flex items-center justify-between px-4">
          <span className="text-white text-[14px] font-[500]">Filter by:</span>
          <span
            className="text-white text-[14px] font-[400] underline cursor-pointer"
            onClick={onResetFilter}
          >
            Reset
          </span>
        </div>
        <div className="w-full px-6 py-4">
          <div className="w-full mb-4">
            <h3 className="text-black text-[14px] font-[500] mb-2">Price</h3>
            <div className="w-full px-2 border border-[#DCDFE0] pb-2">
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
            <h3 className="text-black text-[14px] font-[500] mb-2 capitalize">Filters</h3>
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
                  onChange={onFilterChange}
                  checked={Boolean(params?.filter_options?.hot_seller)}
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
                  onChange={onFilterChange}
                  checked={Boolean(params?.filter_options?.fast_move)}
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
          {/* translate-y-full transition-transform ease-out duration-1000 */}
          <div className={`overflow-hidden ${showMoreFilter ? 'h-auto translate-y-0' : 'h-0'}`}>
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
          </div>

          <div className="flex justify-end w-full">
            <button className="text-orange" onClick={() => setShowMoreFilter(!showMoreFilter)}>
              Show {showMoreFilter ? 'Less' : 'More'}
            </button>
          </div>
        </div>
      </div>

      <ArtFilterModal
        open={openFilter}
        filters={filters}
        params={params}
        onResetFilter={onResetFilter}
        onFilterChange={onFilterChange}
        onPriceHandler={onPriceHandler}
        onRateChange={onRateChange}
        onPriceChange={onPriceChange}
        onClose={() => handleFilter(false)}
      />
    </div>
  );
};

export default BestSellerArtsFilter;
