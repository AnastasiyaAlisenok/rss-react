import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { reducer as searchValueReducer } from './searchValue/searchValue.slice';
import { reducer as limitReducer } from './limit/limit.slice';
import api from '../api/api';

const reducers = combineReducers({
  searchValue: searchValueReducer,
  limit: limitReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useStoreDispatch = (): AppDispatch => useDispatch<AppDispatch>();

setupListeners(store.dispatch);
