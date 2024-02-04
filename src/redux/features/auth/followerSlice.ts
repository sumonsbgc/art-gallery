import { API_URL } from '@/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type FoloowersIdList = {
  status: string;
  followers: number[];
};

const initialState: FoloowersIdList = {
  status: '',
  followers: []
};

export const fetchFollowerIdList = createAsyncThunk('followers/fetch', async () => {
  try {
    const token = Cookies.get('accessToken');
    const response = await fetch(`${API_URL}/user/following/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
});

const followerSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
    getFollowers: (state) => {
      state.followers;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowerIdList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFollowerIdList.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.followers = action.payload.following_artist;
      })
      .addCase(fetchFollowerIdList.rejected, (state) => {
        state.status = 'error';
        state.followers = [];
      });
  }
});

// export const { fetchFollowerIdList };
export const {} = followerSlice.actions;
export default followerSlice.reducer;
