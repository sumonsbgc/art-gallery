import { apiSlice } from '@/redux/apiSlice';
import { addToCart, removeCart } from './cartSlice';

export const cartsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addItemToOrder: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        for (const key in data.items) {
          formData.append('item_id[]', data.items[key]);
        }
        for (const key in data.quantities) {
          formData.append('qty[]', data.quantities[key]);
        }
        formData.append('session_id', data?.session_id);
        return {
          url: '/item/add',
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['carts']
    }),
    removeCartItem: builder.mutation({
      query: (data: { item_id: number }) => ({
        url: `/remove/cart/${data.item_id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      invalidatesTags: ['carts']
    }),
    getOrderItems: builder.query({
      query: () => ({
        url: 'get/cart/data',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      providesTags: ['carts'],
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          if (result?.data?.status === 'success') {
            result?.data?.data?.map((order: any) => {
              api.dispatch(removeCart({ artId: order?.itemDetail?.item_id }));
              api.dispatch(
                addToCart({
                  artId: order?.itemDetail?.item_id,
                  order_id: order?.ord_id,
                  qty: 1,
                  image_path: order?.itemDetail?.image_path,
                  regular_price: order?.itemDetail?.regular_price,
                  title: order?.itemDetail?.item_name,
                  vendorId: order?.itemDetail?.current_owner_id?.id
                })
              );
            });
          }
        } catch (err) {
          console.log('>>> error login', err);
        }
      }
    })
  })
});

export const { useAddItemToOrderMutation, useGetOrderItemsQuery, useRemoveCartItemMutation } =
  cartsApi;
