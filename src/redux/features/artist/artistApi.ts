import { apiSlice } from '@/redux/apiSlice';
import {
  setDisburseAnalytics,
  setOrders,
  setSingleOrder,
  setSingleReviewDetails,
  setWithdraws,
  updateOrderStatus
} from './artistSlice';
import { SingleReviewDetailsPayload } from './artist.types';

export const artistApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation({
      query: (data: FormData) => ({
        url: 'change/order/status',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(updateOrderStatus(result.data));
          }
        } catch (err) {
          console.log('>>> error updateOrderStatus', err);
        }
      }
    }),
    getOrders: builder.query({
      query: (params) => ({
        url: 'product/order',
        method: 'GET',
        params: { ...params }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setOrders(result?.data));
          }
        } catch (err) {
          console.log('>>> error getOrders', err);
        }
      }
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `single/order/${id}`,
        method: 'GET'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setSingleOrder(result?.data));
          }
        } catch (err) {
          console.log('>>> error getSingleOrder', err);
        }
      }
    }),
    getArtists: builder.query({
      query: () => ({
        url: '/artist/home',
        method: 'GET'
      }),
      providesTags: ['home_artists']
    }),
    getArtistsList: builder.query({
      query: (params) => {
        console.log(params, 'PARAMS');
        return {
          url: '/artist/list',
          method: 'GET',
          params: { ...params }
        };
      },
      providesTags: ['artists']
    }),
    getDisburseAnalytics: builder.query({
      query: () => ({
        url: 'artist/disburse-count',
        method: 'GET'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setDisburseAnalytics(result?.data));
          }
        } catch (err) {
          console.log('>>> error getDisburseAnalytics', err);
        }
      }
    }),
    getWithdraws: builder.query({
      query: (params) => ({
        url: 'artist/withdrawal',
        method: 'GET',
        params: { ...params }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setWithdraws(result?.data));
          }
        } catch (err) {
          console.log('>>> error getWithdraws', err);
        }
      }
    }),
    followArtist: builder.mutation({
      query: (data: FormData) => ({
        url: '/user/follow/status',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['following_artists', 'home_artists', 'artists']
    }),
    getAllArtAllRating: builder.query({
      query: (params) => ({
        url: '/get/review/all',
        method: 'GET',
        params: { ...params }
      })
    }),
    getArtistCard: builder.query({
      query: () => ({
        url: '/get/artist/card',
        method: 'GET'
      })
    }),
    getSingleReviewDetails: builder.query({
      query: ({ itemId, userType }: SingleReviewDetailsPayload) => ({
        url: `get/review/detail/${itemId}/${userType}`,
        method: 'GET'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setSingleReviewDetails(result?.data));
          }
        } catch (err) {
          console.log('>>> error getSingleReviewDetails', err);
        }
      }
    })
  })
});

export const {
  useUpdateOrderStatusMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useGetArtistsQuery,
  useGetArtistsListQuery,
  useLazyGetArtistsListQuery,
  useGetDisburseAnalyticsQuery,
  useGetWithdrawsQuery,
  useFollowArtistMutation,
  useGetAllArtAllRatingQuery,
  useGetArtistCardQuery,
  useGetSingleReviewDetailsQuery
} = artistApi;
