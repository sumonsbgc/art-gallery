import { apiSlice } from '@/redux/apiSlice';
import { register, login, setProfile, setCountryList, logout } from './authSlice';
import { LoginPayload, RegisterPayload, ForgotPayload, ResetPayload } from './auth.types';
import { removeAllCart } from '@/redux/features/carts/cartSlice';

import Cookies from 'js-cookie';
// import { setFollowers } from './followerSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginPayload | FormData) => ({
        url: 'auth/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['carts', 'profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            Cookies.set('accessToken', result?.data?.token, {
              expires: 7,
              httpOnly: true
            });
            dispatch(login(result.data));
          }
        } catch (err) {
          console.log('>>> error login', err);
        }
      }
    }),

    register: builder.mutation({
      query: (data: RegisterPayload | FormData) => ({
        url: 'auth/register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['carts', 'profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            Cookies.set('accessToken', result?.data?.token, {
              expires: 7,
              httpOnly: true
            });
            dispatch(register(result?.data));
          }
        } catch (err) {
          console.log('>>> error register', err);
        }
      }
    }),

    forgotPassword: builder.mutation({
      query: (data: ForgotPayload | FormData) => ({
        url: 'forgot-password',
        method: 'POST',
        body: data
      })
    }),

    resetPassword: builder.mutation({
      query: (data: ResetPayload | FormData) => ({
        url: 'reset-password',
        method: 'POST',
        body: data
      })
    }),

    logout: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(removeAllCart());
            dispatch(logout());
          }
        } catch (err) {
          console.log('>>> error logout', err);
        }
      }
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'get/userinfo',
        method: 'GET'
      }),
      providesTags: ['profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setProfile(result?.data));
          }
        } catch (err) {
          console.log('>>> error getProfile', err);
        }
      }
    }),

    updateProfile: builder.mutation({
      query: (data: FormData) => ({
        url: 'update/info',
        method: 'POST',
        body: data,
        headers: {
          'content-type': 'multipart/form-data'
        }
      }),
      invalidatesTags: ['profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setProfile(result?.data));
          }
        } catch (err) {
          console.log('>>> error updateProfile', err);
        }
      }
    }),

    updateAboutMe: builder.mutation({
      query: (data: FormData) => ({
        url: 'update/about',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setProfile(result?.data));
          }
        } catch (err) {
          console.log('>>> error updateAboutMe', err);
        }
      }
    }),

    updatePaymentDetails: builder.mutation({
      query: (data: FormData) => ({
        url: 'update/payment',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setProfile(result?.data));
          }
        } catch (err) {
          console.log('>>> error updatePaymentDetails', err);
        }
      }
    }),

    getCountryList: builder.query({
      query: () => ({
        url: 'country/list',
        method: 'GET'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setCountryList(result?.data));
          }
        } catch (err) {
          console.log('>>> error getCountryList', err);
        }
      }
    }),

    upgradeCustomer: builder.mutation({
      query: (data: FormData) => ({
        url: '/upgrade/customer',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      invalidatesTags: ['profile', 'artists']
    }),

    getFollowerList: builder.query({
      query: () => ({
        url: '/user/following/list',
        method: 'GET'
      }),
      providesTags: ['following_artists'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            // dispatch(setFollowers(result?.data));
          }
        } catch (err) {
          console.log('>>> error getSingleReviewDetails', err);
        }
      }
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyLogoutQuery,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAboutMeMutation,
  useUpdatePaymentDetailsMutation,
  useGetCountryListQuery,
  useUpgradeCustomerMutation,
  useLazyGetFollowerListQuery
} = authApi;
