import { API_URL } from '@/config/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './features/auth/authSlice';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  // mode: 'cors',
  baseUrl: API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const state: any = getState();
    const token = state?.auth?.accessToken || Cookies.get('accessToken');
    headers.delete('Content-Type');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
      api.dispatch(logout());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: [
    'carts',
    'profile',
    'orders',
    'likes',
    'feature_arts',
    'top_rated_arts',
    'arts',
    'art',
    'my_arts',
    'my_arts_by_artist_id',
    'customer_reviews',
    'critic_reviews',
    'reviews',
    'my_critic_reviews',
    'critic_reviews_by_critic_id',
    'following_artists',
    'artists',
    'home_artists',
    'short_chart',
    'long_chart',
    'home_top_rated',
    'home_highly_appreciate',
    'home_top_hundred',
    'home_hot_seller',
    'home_most_like',
    'home_most_review'
  ],
  endpoints: () => ({})
});
