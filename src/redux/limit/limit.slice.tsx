import { createSlice } from '@reduxjs/toolkit';

const limitSlice = createSlice({
  name: 'limit',
  initialState: 4,
  reducers: {
    setLimit: (state, action) => action.payload,
  },
});

export const { actions, reducer } = limitSlice;
