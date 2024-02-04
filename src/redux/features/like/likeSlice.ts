import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
// import { ArtItem } from './like.types';
import { ArtItem } from '@/types/art';

export type LikeState = {
  likeArts: ArtItem[];
  likeArtsAllData: {
    current_page: number;
    data: ArtItem[];
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

const initialState: LikeState = {
  likeArts: [],
  likeArtsAllData: {
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

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      // const { data } = action.payload;
      // const newItem: ArtItem = data;
      // const isExist = state.likeArts.find((item) => item.item_id === newItem.item_id);

      // if (!isExist) {
      //   state.likeArts = [newItem, ...state.likeArts];
      // }
    },
    removeLike: (state, action: PayloadAction<any>) => {
      const { itemId } = action.payload;
      state.likeArts = state.likeArts.filter((item) => item.item_id !== itemId);
    },
    setLikes: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;

      const uniqueLikeArts = state.likeArts.filter(
        (like) => !data?.data?.find((item: ArtItem) => item.item_id === like.item_id)
      );
      state.likeArts = [...uniqueLikeArts, ...(data?.data || [])];
      state.likeArtsAllData = data;
    },
    resetLike: (state) => {
      state.likeArts = initialState?.likeArts;
      state.likeArtsAllData = initialState?.likeArtsAllData;
    }
  }
});

export const { addLike, removeLike, setLikes, resetLike } = likeSlice.actions;
export default likeSlice.reducer;
