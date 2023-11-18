import { createSlice } from '@reduxjs/toolkit';

const isLoadingDetailSlice = createSlice({
  name: 'isLoadingDetail',
  initialState: true,
  reducers: {
    setLoadingDeatil: (state, action) => action.payload,
  },
});

export const { actions, reducer } = isLoadingDetailSlice;
