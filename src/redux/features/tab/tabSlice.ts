import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type tabStatusType = {
  activeTab: string;
};

const initialState: tabStatusType = {
  activeTab: ''
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    toggleActiveTab: (state, action: PayloadAction<any>) => {
      const { activeTab } = action.payload;
      state.activeTab = activeTab;
    }
  }
});

export const { toggleActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
