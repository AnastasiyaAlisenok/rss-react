import { createSlice } from '@reduxjs/toolkit';

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: /* localStorage.getItem('search-value') || */ '',
  reducers: {
    saveSearchValue: (state, action) => action.payload,
  },
});

export const { actions, reducer } = searchValueSlice;

export const { saveSearchValue } = searchValueSlice.actions;
