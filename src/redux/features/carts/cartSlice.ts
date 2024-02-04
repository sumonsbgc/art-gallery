import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartItems } from './cart.types';

let carts = {};

if (typeof window !== 'undefined') {
  carts = JSON.parse(localStorage.getItem('carts') || '{}');
}

const initialState: CartItems = {
  carts,
  couponCode: '',
  couponAmount: 0
};

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { artId, title, qty, image_path, regular_price, vendorId, order_id } = action.payload;

      if (!state?.carts[artId] || !state?.carts[order_id]) {
        state.carts[artId] = {
          artId,
          title,
          qty,
          image_path,
          regular_price,
          vendorId,
          order_id
        };
      }

      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    removeCart: (state, action: PayloadAction<any>) => {
      console.log(action?.payload, 'REMOVE CART');
      const { artId } = action.payload;
      if (state.carts[artId]) {
        delete state.carts[artId];
      }

      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    removeAllCart: (state) => {
      state.carts = {};
      console.log('removeAllCart');
      // localStorage.removeItem('carts');
    },
    setCoupon: (state, action: PayloadAction<any>) => {
      const { couponCode, couponAmount } = action.payload;
      state.couponCode = couponCode;
      state.couponAmount = couponAmount;
    }
  }
});

export const { addToCart, removeCart, removeAllCart, setCoupon } = cartsSlice.actions;
export default cartsSlice.reducer;
