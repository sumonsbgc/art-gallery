import { apiSlice } from '@/redux/apiSlice';
import { addLike, removeLike, resetLike, setLikes } from './likeSlice';

export const likeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation({
      query: (data: FormData) => ({
        url: 'item/favorite/add',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [
        'likes',
        'art',
        'arts',
        'feature_arts',
        'top_rated_arts',
        'short_chart',
        'my_arts',
        'my_arts_by_artist_id',
        'long_chart'
      ],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const object: any = {};
          // arg.forEach((value, key) => object[key] = value);
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            // dispatch(addLike({ itemId: object?.item_id }));
            dispatch(addLike(result?.data));
          }
        } catch (err) {
          console.log('>>> error addLike', err);
        }
      }
    }),
    removeLike: builder.mutation({
      query: (data: FormData) => ({
        url: 'item/favorite/remove',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [
        'likes',
        'art',
        'arts',
        'feature_arts',
        'top_rated_arts',
        'short_chart',
        'my_arts',
        'my_arts_by_artist_id',
        'long_chart'
      ],
      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          console.log(arg, queryFulfilled, dispatch);
          const object: any = {};
          arg.forEach((value: any, key: any) => (object[key] = value));
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(removeLike({ itemId: object?.item_id }));
          }
        } catch (err) {
          console.log('>>> error removeLike', err);
        }
      }
    }),
    getLikes: builder.query({
      query: (params) => ({
        url: 'item/favorite/list',
        method: 'GET',
        params: { ...params }
      }),
      providesTags: ['likes'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            if (!arg?.page || arg?.page === 1) {
              dispatch(resetLike());
            }
            dispatch(setLikes(result?.data));
          }
        } catch (err) {
          console.log('>>> error getLikes', err);
        }
      }
    })
  })
});

export const { useAddLikeMutation, useRemoveLikeMutation, useGetLikesQuery, useLazyGetLikesQuery } =
  likeApi;
