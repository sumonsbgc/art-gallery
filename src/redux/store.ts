import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/redux/apiSlice';

// reducers
import authReducer from '@/redux/features/auth/authSlice';
import cartReducer from './features/carts/cartSlice';
import paymentReducer from './features/payment/paymentSlice';
import likeReducer from './features/like/likeSlice';
import artistReducer from './features/artist/artistSlice';
import criticReducer from './features/critic/criticSlice';
import tabSlice from './features/tab/tabSlice';
import siteSlice from './slices/siteSlice';
import reviewReducer from './features/review/reviewRatingSlice';
import followerSlice from './features/auth/followerSlice';

export const store = configureStore({
  reducer: {
    utils: siteSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    carts: cartReducer,
    payment: paymentReducer,
    like: likeReducer,
    artist: artistReducer,
    critic: criticReducer,
    tab: tabSlice,
    reviewRating: reviewReducer,
    followers: followerSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
