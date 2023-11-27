import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';
import { reducer as searchValueReducer } from './searchValue/searchValue.slice';
import { reducer as limitReducer } from './limit/limit.slice';
import { reducer as pageReducer } from './page/page.slice';
import { reducer as loadingPageReducer } from './isLoadingPage/isLoadingPage.slice';
import { reducer as loadingDetailReducer } from './isLoadingDetail/isLoadingDetail.slice';
import api from '../api/api';

const reducers = combineReducers({
  searchValue: searchValueReducer,
  limit: limitReducer,
  page: pageReducer,
  isLoadingPage: loadingPageReducer,
  isLoadingDetail: loadingDetailReducer,
  [api.reducerPath]: api.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export const setupStore = (preloadedState?: PreloadedState<RootReducer>) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(api.middleware),
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type RootReducer = ReturnType<typeof reducers>;
export type AppStoreTest = ReturnType<typeof setupStore>;
export type AppStore = ReturnType<typeof makeStore>;

setupListeners(store.dispatch);

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
