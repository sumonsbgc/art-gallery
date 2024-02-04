import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import { Reviews } from './reviewRating.types';

export type ReviewRatingState = {
  reviewsData: {
    current_page: number;
    data: Reviews[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
};

export type ReviewRatingStateType = {
  reviewsData: {
    current_page: number;
    data: Reviews[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total_record: number;
  };
};

const initialState: ReviewRatingState = {
  reviewsData: {
    current_page: 0,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    links: [],
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: '',
    to: 0,
    total: 0
  }
};

const reviewRatingSlice = createSlice({
  name: 'reviewRating',
  initialState,
  reducers: {
    setAllReviews: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.reviewsData = data;
    }
  }
});

export const { setAllReviews } = reviewRatingSlice.actions;
export default reviewRatingSlice.reducer;
