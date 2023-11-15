import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { reducer as searchValueReducer } from './searchValue/searchValue.slice';
import { reducer as limitReducer } from './limit/limit.slice';

const reducers = combineReducers({
  searchValue: searchValueReducer,
  limit: limitReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useStoreDispatch = (): AppDispatch => useDispatch<AppDispatch>();
