import { createSlice } from '@reduxjs/toolkit';

interface PageState {
  page: number;
  lastPage: number | null | undefined;
}
const initialState: PageState = {
  page: 1,
  lastPage: null,
};

const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      state.page -= 1;
    },
    setNewPage: (state, action) => {
      state.page = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
  },
});

export const { actions, reducer } = pageSlice;

export const { increment, decrement, setNewPage, setLastPage } =
  pageSlice.actions;
