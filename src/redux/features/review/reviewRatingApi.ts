import { apiSlice } from '@/redux/apiSlice';
import { setAllReviews } from './reviewRatingSlice';

const customerReview = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomerReview: builder.mutation({
      query: (data: FormData) => ({
        url: '/customer/review',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['reviews', 'critic_reviews', 'art', 'short_chart', 'long_chart']
    }),
    getAllReviews: builder.query({
      query: (params) => ({
        url: '/get/review/all/single',
        method: 'GET',
        params: { ...params }
      }),
      providesTags: ['reviews'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setAllReviews(result?.data));
          }
        } catch (err) {
          console.log('>>> error getAllReviews', err);
        }
      }
    }),
    getCustomerReviews: builder.query({
      query: (item_id: number) => ({
        url: `customer/review/list?item_id=${item_id}`,
        method: 'GET'
      }),
      providesTags: ['customer_reviews']
    })
  })
});

export const { useAddCustomerReviewMutation, useGetAllReviewsQuery } = customerReview;
