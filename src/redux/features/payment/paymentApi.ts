import { apiSlice } from '@/redux/apiSlice';
import { confirmPaymentPayload } from './paymentApi.types';
import { setOrderList } from './paymentSlice';

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    confirmPayment: builder.mutation({
      query: (data: confirmPaymentPayload | FormData) => ({
        url: 'confirm/payment',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['carts', 'orders']
    }),

    getOrderList: builder.query({
      query: (params) => ({
        url: 'purchase/item',
        method: 'GET',
        params: { ...params }
      }),
      providesTags: ['orders'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(setOrderList(result?.data));
          }
        } catch (err) {
          console.log('>>> error getOrderList', err);
        }
      }
    }),

    changeOrderStatus: builder.mutation({
      query: (data: FormData) => ({
        url: 'change/order/status',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['orders']
    }),

    applyCoupon: builder.mutation({
      query: (data: FormData) => ({
        url: 'apply/coupon',
        method: 'POST',
        body: data
      })
    }),

    removeCoupon: builder.query({
      query: () => ({
        url: 'remove/coupon',
        method: 'GET'
      })
    })
  })
});

export const {
  useConfirmPaymentMutation,
  useGetOrderListQuery,
  useLazyGetOrderListQuery,
  useChangeOrderStatusMutation,
  useApplyCouponMutation,
  useLazyRemoveCouponQuery
} = paymentApi;
