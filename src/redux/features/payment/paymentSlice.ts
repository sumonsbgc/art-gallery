import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import { OrderType } from '@/redux/features/artist/artist.types';

export interface Ipayment {
  orderList: OrderType[];
  orderListAllData: any;
}

const initialState: Ipayment = {
  orderList: [],
  orderListAllData: {}
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setOrderList: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;

      const uniqueOrderList = state.orderList.filter(
        (order) => !data?.data?.find((item: OrderType) => item.chout_id === order.chout_id)
      );
      state.orderList = [...uniqueOrderList, ...(data?.data || [])];
      state.orderListAllData = data;
    }
  }
});

export const { setOrderList } = paymentSlice.actions;
export default paymentSlice.reducer;
