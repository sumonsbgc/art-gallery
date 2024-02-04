import { apiSlice } from '@/redux/apiSlice';
import { setMyReviews, setReviewsByCriticId } from './criticSlice';
import { CriticsReviewPayload } from './critic.types';

export const artistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyReviews: builder.query({
      query: (params) => ({
        url: `critic/review?${params}`,
        method: 'GET'
      }),
      providesTags: ['my_critic_reviews'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setMyReviews(result?.data));
          }
        } catch (err) {
          console.log('>>> error getMyReviews', err);
        }
      }
    }),
    getToReviews: builder.query({
      query: (params) => ({
        url: 'critic/to/review',
        method: 'GET',
        params: { ...params }
      }),
      providesTags: ['critic_reviews'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setMyReviews(result?.data));
          }
        } catch (err) {
          console.log('>>> error getToReviews', err);
        }
      }
    }),
    addCriticsReview: builder.mutation({
      query: (data: CriticsReviewPayload | FormData) => ({
        url: 'add/critic/review',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['my_critic_reviews'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setMyReviews(result.data));
          }
        } catch (err) {
          console.log('>>> error login', err);
        }
      }
    }),
    getCriticReviewByCriticId: builder.query({
      query: (params) => {
        console.log(params);
        return {
          url: 'public/critic/review',
          method: 'GET',
          params: { ...params }
        };
      },
      providesTags: ['critic_reviews_by_critic_id'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result?.data, 'CRITIC API');
          if (result?.data?.data?.status === 'success') {
            dispatch(setReviewsByCriticId(result?.data));
          }
        } catch (err) {
          console.log('>>> error getMyReviews', err);
        }
      }
    })
  })
});

export const {
  useGetMyReviewsQuery,
  useGetToReviewsQuery,
  useLazyGetToReviewsQuery,
  useAddCriticsReviewMutation,
  useGetCriticReviewByCriticIdQuery
} = artistApi;
