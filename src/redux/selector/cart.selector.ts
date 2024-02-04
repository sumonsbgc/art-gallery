/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hooks';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export const cartItems = (state: RootState) => state.carts.carts;
export const getCartList = createSelector(cartItems, (carts) => Object.values(carts));
export const getTotalCarts = createSelector(getCartList, (carts) =>
  carts.reduce((sum, cart) => sum + cart?.qty, 0)
);

export const getCouponData = () =>
  useAppSelector((state: RootState) => ({
    couponCode: state.carts.couponCode,
    couponAmount: state.carts.couponAmount
  }));
