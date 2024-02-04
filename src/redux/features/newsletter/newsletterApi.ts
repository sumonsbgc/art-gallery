import { apiSlice } from '@/redux/apiSlice';

const newsletterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (data: FormData) => ({
        url: 'start/subscription',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useSubscribeMutation } = newsletterApi;
