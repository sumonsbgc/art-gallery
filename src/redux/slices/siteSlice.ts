import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paypalToken: '',
  cartItemID: ''
};

export const siteSlice = createSlice({
  name: 'siteSliceReducer',
  initialState,
  reducers: {
    setPaypalToken: (state, action) => {
      state.paypalToken = action.payload;
    },
    setCartItemID: (state, action) => {
      state.cartItemID = action.payload;
    }
  }
});

export const { setPaypalToken, setCartItemID } = siteSlice.actions;

export default siteSlice.reducer;
