import { apiSlice } from '@/redux/apiSlice';

const ArtsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    UploadImg: builder.mutation({
      query: (data: FormData) => ({
        url: '/item/upload',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }),
    UploadArt: builder.mutation({
      query: (data) => ({
        url: '/iteam/store',
        method: 'POST',
        body: data
      })
    }),
    updateArt: builder.mutation({
      query: (data: { formData: FormData; itemId: number }) => ({
        url: `/item/update/${data?.itemId}`,
        method: 'POST',
        body: data.formData
      }),
      invalidatesTags: ['my_arts']
    }),
    updateArtSaleStatus: builder.mutation({
      query: (data) => ({
        url: '/artist/sale-status',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['art']
    }),
    getFeaturedArts: builder.query({
      query: () => ({
        url: '/item/feature',
        method: 'GET'
      }),
      providesTags: ['feature_arts'],
      transformResponse: (res: any) => ({
        status: res.status,
        data: res.data
      })
    }),
    getArt: builder.query({
      query: (artSlug) => ({
        url: `/single/item/${artSlug}`,
        method: 'GET'
      }),
      providesTags: ['art']
    }),
    getArts: builder.query({
      query: (params) => {
        const optionsParam = params?.filter_options
          ? Object.entries(params.filter_options).map(
              ([key, value]) => value === 1 && `${key}=${value}`
            )
          : [];
        const rateParams = (params?.rates || [])?.map((rate: number) => `rate[]=${rate}`);
        const sizeParams = (params?.size_id || [])?.map((size: number) => `size_id[]=${size}`);
        const catParams = (params?.categories || [])?.map((cat: number) => `category_id[]=${cat}`);

        const queryString = [
          ...rateParams,
          ...optionsParam,
          ...sizeParams,
          ...catParams,
          params?.lastday && `lastday=${params.lastday}`,
          params?.sort_by && `sort_by=${params.sort_by}`,
          params?.page && `page=${params.page}`,
          params?.minimum_price >= 0 && `minimum_price=${params.minimum_price}`,
          params?.maximum_price >= 0 && `maximum_price=${params.maximum_price}`,
          params?.global_search !== '' && `global_search=${params.global_search}`
        ]
          .filter(Boolean)
          .join('&');

        return { url: `/item/get?${queryString}`, method: 'GET' };
      },
      providesTags: ['arts']
    }),
    getBestSellerArts: builder.query({
      query: (params) => {
        const optionsParam = params?.filter_options
          ? Object.entries(params.filter_options).map(
              ([key, value]) => value === 1 && `${key}=${value}`
            )
          : [];
        const rateParams = (params?.rates || [])?.map((rate: number) => `rate[]=${rate}`);
        const sizeParams = (params?.size_id || [])?.map((size: number) => `size_id[]=${size}`);
        const catParams = (params?.categories || [])?.map((cat: number) => `category_id[]=${cat}`);

        const queryString = [
          ...rateParams,
          ...optionsParam,
          ...sizeParams,
          ...catParams,
          params?.lastday && `lastday=${params.lastday}`,
          params?.sort_by && `sort_by=${params.sort_by}`,
          params?.top_hundred && `top_hundred=${params.top_hundred}`,
          params?.page && `page=${params.page}`,
          params?.minimum_price >= 0 && `minimum_price=${params.minimum_price}`,
          params?.maximum_price >= 0 && `maximum_price=${params.maximum_price}`,
          params?.global_search !== '' && `global_search=${params.global_search}`
        ]
          .filter(Boolean)
          .join('&');

        return { url: `/best/seller/item?${queryString}`, method: 'GET' };
      },
      providesTags: ['arts']
    }),
    getAllArtWorkArts: builder.query({
      query: (params) => {
        const optionsParam = params?.filter_options
          ? Object.entries(params.filter_options).map(
              ([key, value]) => value === 1 && `${key}=${value}`
            )
          : [];
        const rateParams = (params?.rates || [])?.map((rate: number) => `rate[]=${rate}`);
        const sizeParams = (params?.size_id || [])?.map((size: number) => `size_id[]=${size}`);
        const catParams = (params?.categories || [])?.map((cat: number) => `category_id[]=${cat}`);

        const queryString = [
          ...rateParams,
          ...optionsParam,
          ...sizeParams,
          ...catParams,
          params?.lastday && `lastday=${params.lastday}`,
          params?.sort_by && `sort_by=${params.sort_by}`,
          params?.top_hundred && `top_hundred=${params.top_hundred}`,
          params?.page && `page=${params.page}`,
          params?.minimum_price >= 0 && `minimum_price=${params.minimum_price}`,
          params?.maximum_price >= 0 && `maximum_price=${params.maximum_price}`,
          params?.global_search !== '' && `global_search=${params.global_search}`
        ]
          .filter(Boolean)
          .join('&');

        return { url: `/all/art/item?${queryString}`, method: 'GET' };
      },
      providesTags: ['arts']
    }),
    getTopRatedArt: builder.query({
      query: () => ({
        url: 'item/top/rated',
        method: 'GET'
      }),
      providesTags: ['top_rated_arts']
    }),
    getArtsByArtistId: builder.query({
      query: (params) => ({
        url: 'art/of/artist',
        method: 'GET',
        params: { ...params }
      }),
      providesTags: ['my_arts_by_artist_id']
    }),
    getArtsByNativeArtistId: builder.query({
      query: (params) => ({
        url: 'native/art',
        method: 'GET',
        params: { ...params }
      }),
      providesTags: ['my_arts']
    }),
    getShortPriceGraphData: builder.query({
      query: (itemId: number) => ({
        url: `item/graph/${itemId}`,
        method: 'GET'
      }),
      providesTags: ['short_chart']
    }),
    getDetailPriceGraphData: builder.query({
      query: (params: { itemId: number; start_date: string | null; end_date: string | null }) => {
        let queryString = String(params?.itemId);
        if (params?.start_date && params?.end_date) {
          queryString = `${queryString}?start_date=${params?.start_date}&end_date=${params?.end_date}`;
        }
        return { url: `get/graph/filter/${queryString}`, method: 'GET' };
      },
      providesTags: ['long_chart']
    })
  })
});

export const {
  useUploadArtMutation,
  useUploadImgMutation,
  useUpdateArtMutation,
  useUpdateArtSaleStatusMutation,
  useGetTopRatedArtQuery,
  useGetFeaturedArtsQuery,
  useGetShortPriceGraphDataQuery,
  useGetDetailPriceGraphDataQuery,
  useGetArtsQuery,
  useLazyGetArtsQuery,
  useGetAllArtWorkArtsQuery,
  useLazyGetAllArtWorkArtsQuery,
  useGetBestSellerArtsQuery,
  useLazyGetBestSellerArtsQuery,
  useGetArtsByArtistIdQuery,
  useGetArtsByNativeArtistIdQuery,
  useLazyGetArtsByArtistIdQuery,
  useGetArtQuery
} = ArtsApi;
