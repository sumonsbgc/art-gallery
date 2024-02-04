import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import { MyReviews } from './critic.types';

export type CriticState = {
  myReviews: MyReviews;
};

const initialState: CriticState = {
  myReviews: {
    current_page: 1,
    data: [],
    first_page_url: '',
    from: null,
    last_page: 1,
    last_page_url: '',
    links: [
      {
        url: null,
        label: '',
        active: false
      }
    ],
    next_page_url: null,
    path: '',
    per_page: 1,
    prev_page_url: null,
    to: null,
    total: 1
  }
};

const criticSlice = createSlice({
  name: 'critic',
  initialState,
  reducers: {
    setMyReviews: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.myReviews = data;
    },
    setReviewsByCriticId: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.myReviews = data;
    }
  }
});

export const { setMyReviews, setReviewsByCriticId } = criticSlice.actions;
export default criticSlice.reducer;
