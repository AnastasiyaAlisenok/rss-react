import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from './Form.slice';
import { reducer as countriesReducer } from './Countries.slice';

const reducers = combineReducers({
  formData: formReducer,
  countriesArr: countriesReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
