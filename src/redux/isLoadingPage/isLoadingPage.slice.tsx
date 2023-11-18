import { createSlice } from '@reduxjs/toolkit';

const isLoadingPageSlice = createSlice({
  name: 'isLoadingPage',
  initialState: true,
  reducers: {
    setLoadingPage: (state, action) => action.payload,
  },
});

export const { actions, reducer } = isLoadingPageSlice;
