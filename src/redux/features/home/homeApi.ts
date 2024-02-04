import { apiSlice } from '@/redux/apiSlice';

const HomeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeTopRated: builder.query({
      query: () => ({
        url: '/home/top/rated',
        method: 'GET'
      }),
      providesTags: ['home_top_rated']
    }),

    getHomeHighlyAppreciate: builder.query({
      query: () => ({
        url: '/home/highly/appreciate',
        method: 'GET'
      }),
      providesTags: ['home_highly_appreciate']
    }),

    getHomeTopHundred: builder.query({
      query: () => ({
        url: '/home/top/hundred',
        method: 'GET'
      }),
      providesTags: ['home_top_hundred']
    }),

    getHomeHotSeller: builder.query({
      query: () => ({
        url: '/home/hot/seller',
        method: 'GET'
      }),
      providesTags: ['home_hot_seller']
    }),

    getHomeMostLike: builder.query({
      query: () => ({
        url: '/home/most/like',
        method: 'GET'
      }),
      providesTags: ['home_most_like']
    }),

    getHomeMostReview: builder.query({
      query: () => ({
        url: '/home/most/review',
        method: 'GET'
      }),
      providesTags: ['home_most_review']
    })
  })
});

export const {
  useGetHomeTopRatedQuery,
  useGetHomeHighlyAppreciateQuery,
  useGetHomeTopHundredQuery,
  useGetHomeHotSellerQuery,
  useGetHomeMostLikeQuery,
  useGetHomeMostReviewQuery
} = HomeApi;
