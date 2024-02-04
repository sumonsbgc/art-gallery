import { apiSlice } from '@/redux/apiSlice';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    storeContact: build.mutation({
      query: (data: FormData) => ({
        url: '/contact',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useStoreContactMutation } = contactApi;
